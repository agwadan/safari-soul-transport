
"use client";

import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import Icon from "../components/ui/Icons";

const DEFAULT_COUNTRY_CODES = ["ke", "ug"] as const;

interface LocationAutocompleteProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onSelect?: (location: {
    address: string;
    placeId: string;
    lat?: number;
    lng?: number;
  }) => void;
  placeholder?: string;
  icon: "my_location" | "location_on";
  iconClassName: string;
  inputClassName: string;
  countryCode?: string | readonly string[];
}

interface Suggestion {
  prediction: google.maps.places.PlacePrediction;
  text: string;
  description: string;
  placeId: string;
}

// Share the library-loading promise between component instances.
let placesLibraryPromise: Promise<google.maps.PlacesLibrary> | null = null;

function loadPlacesLibrary(
  apiKey: string
): Promise<google.maps.PlacesLibrary> {
  if (!placesLibraryPromise) {
    setOptions({
      key: apiKey,
      v: "weekly",
    });

    placesLibraryPromise = importLibrary("places")
      .then((library) => library as google.maps.PlacesLibrary)
      .catch((error) => {
        placesLibraryPromise = null;
        throw error;
      });
  }

  return placesLibraryPromise;
}

export default function LocationAutocomplete({
  id,
  value,
  onChange,
  onSelect,
  placeholder = "Airport, hotel, or address",
  icon,
  iconClassName,
  inputClassName,
  countryCode = DEFAULT_COUNTRY_CODES,
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const [places, setPlaces] =
    useState<google.maps.PlacesLibrary | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);

  // Keep the session token in a ref so updating it doesn't retrigger
  // the autocomplete effect.
  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  // Use a stable primitive dependency instead of an array that may be
  // recreated on every render.
  const countryCodesKey =
    typeof countryCode === "string"
      ? countryCode
      : countryCode.join(",");

  const includedRegionCodes = countryCodesKey
    .split(",")
    .map((code) => code.trim())
    .filter(Boolean);

  // Load Google Places once per module, shared by all instances.
  useEffect(() => {
    let cancelled = false;

    const key = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    if (!key) {
      setError("Location suggestions are unavailable.");
      return;
    }

    loadPlacesLibrary(key)
      .then((library) => {
        if (!cancelled) {
          setPlaces(library);
          setError("");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load location suggestions.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Close suggestions when clicking outside.
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Fetch predictions as the user types.
  useEffect(() => {
    // Invalidate any earlier request, including when the dropdown closes.
    const currentRequest = ++requestId.current;

    if (!places || !open || value.trim().length < 3) {
      setSuggestions((current) =>
        current.length > 0 ? [] : current
      );
      setLoading((current) => (current ? false : current));
      return;
    }

    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const token =
          sessionTokenRef.current ??
          new places.AutocompleteSessionToken();

        sessionTokenRef.current = token;

        const { suggestions: results = [] } =
          await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input: value.trim(),
            sessionToken: token,
            includedRegionCodes,
          });

        // Ignore stale responses if the user has typed again or closed
        // the dropdown.
        if (currentRequest !== requestId.current) {
          return;
        }

        const mapped: Suggestion[] = results.flatMap((result) => {
          const prediction = result.placePrediction;

          if (!prediction) {
            return [];
          }

          return [
            {
              prediction,
              text: prediction.text.toString(),
              description:
                prediction.secondaryText?.toString() ?? "",
              placeId: prediction.placeId,
            },
          ];
        });

        setSuggestions(mapped);
        setError("");
      } catch {
        if (currentRequest === requestId.current) {
          setSuggestions([]);
          setError("Unable to find locations right now.");
        }
      } finally {
        if (currentRequest === requestId.current) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [value, open, places, countryCodesKey]);

  async function selectSuggestion(item: Suggestion) {
    // Ignore outstanding requests for the previous input.
    requestId.current++;

    setOpen(false);
    setSuggestions([]);
    setLoading(false);

    onChange(item.text);

    try {
      const place = item.prediction.toPlace();

      await place.fetchFields({
        fields: ["formattedAddress", "location"],
      });

      const address = place.formattedAddress || item.text;
      const location = place.location;

      onChange(address);

      onSelect?.({
        address,
        placeId: item.placeId,
        lat: location?.lat(),
        lng: location?.lng(),
      });
    } catch {
      // The prediction remains usable if fetching place details fails.
      onSelect?.({
        address: item.text,
        placeId: item.placeId,
      });
    } finally {
      // A selection completes this autocomplete session.
      sessionTokenRef.current = null;
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <Icon
        name={icon}
        size={20}
        className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${iconClassName}`}
      />

      <input
        id={id}
        type="text"
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open && suggestions.length > 0}
        aria-controls={`${id}-suggestions`}
        aria-busy={loading}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
      />

      {open && value.trim().length >= 3 && (
        <div
          id={`${id}-suggestions`}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl"
        >
          {loading && (
            <p className="px-4 py-3 text-sm text-neutral-500">
              Finding locations...
            </p>
          )}

          {!loading &&
            suggestions.map((item) => (
              <button
                key={item.placeId}
                type="button"
                role="option"
                aria-selected={false}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectSuggestion(item)}
                className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-neutral-50"
              >
                <Icon
                  name="location_on"
                  size={20}
                  className="mt-0.5 shrink-0 text-neutral-500"
                />

                <span className="min-w-0">
                  <span className="block text-sm font-medium text-[#0a0a0a]">
                    {item.text}
                  </span>

                  {item.description && (
                    <span className="mt-0.5 block text-xs text-neutral-500">
                      {item.description}
                    </span>
                  )}
                </span>
              </button>
            ))}

          {!loading && suggestions.length === 0 && !error && (
            <p className="px-4 py-3 text-sm text-neutral-500">
              No matching locations found.
            </p>
          )}

          {error && (
            <p className="px-4 py-3 text-sm text-neutral-500">
              {error}
            </p>
          )}

          <div className="border-t border-neutral-100 px-3 py-2 text-right">
            <span className="text-xs text-neutral-500">
              Powered by Google
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
