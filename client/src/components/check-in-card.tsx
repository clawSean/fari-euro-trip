import { useState, useRef, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as exifr from "exifr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  MapPin,
  CheckCircle2,
  Send,
  LocateFixed,
  AlertCircle,
  Camera,
  X,
  Images,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import type { ChatMessage } from "@shared/schema";

interface CheckInCardProps {
  location: string;
  isoDate: string;
}

interface PhotoLocation {
  lat: string;
  lng: string;
  mapsUrl: string;
}

interface PhotoMetadata {
  location: PhotoLocation | null;
  takenAt: string | null;
}

const romeCheckIns = [
  { label: "Vatican", emoji: "⛪", message: "Checked in at the Vatican ⛪" },
  { label: "Pantheon", emoji: "🏛️", message: "Checked in at the Pantheon 🏛️" },
  { label: "The Court", emoji: "🥂", message: "Checked in at The Court — Colosseum-view drinks mode 🥂🏛️" },
  { label: "Gelato", emoji: "🍦", message: "Gelato check-in 🍦" },
];

const MAX_DIMENSION = 800;
const JPEG_QUALITY = 0.65;
const MAX_COMPRESSED_BYTES = 300 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

function toIsoDate(value: unknown) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

async function readPhotoMetadata(file: File): Promise<PhotoMetadata> {
  try {
    const [gps, exif] = await Promise.all([
      exifr.gps(file),
      exifr.parse(file, ["DateTimeOriginal", "CreateDate", "ModifyDate"]).catch(() => null),
    ]);
    const latitude = Number(gps?.latitude);
    const longitude = Number(gps?.longitude);
    const takenAt = toIsoDate(
      exif?.DateTimeOriginal ?? exif?.CreateDate ?? exif?.ModifyDate,
    );

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return { location: null, takenAt };
    }

    const lat = latitude.toFixed(5);
    const lng = longitude.toFixed(5);

    return {
      takenAt,
      location: {
        lat,
        lng,
        mapsUrl: `https://maps.google.com/?q=${lat},${lng}`,
      },
    };
  } catch {
    return { location: null, takenAt: null };
  }
}

function getNickname() {
  if (typeof window === "undefined") return "Trip Crew";
  return localStorage.getItem("chat-nickname") || "Trip Crew";
}

function getDefaultCheckIns(location: string) {
  if (location === "Rome") return romeCheckIns;
  return [
    { label: location, emoji: "📍", message: `Checked in at ${location} 📍` },
    { label: "Food stop", emoji: "🍝", message: "Food stop check-in 🍝" },
    { label: "View", emoji: "📸", message: "View check-in 📸" },
    { label: "Gelato", emoji: "🍦", message: "Gelato check-in 🍦" },
  ];
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const scale = MAX_DIMENSION / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas not supported")); return; }
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
      if (dataUrl.length > MAX_COMPRESSED_BYTES) {
        reject(new Error("Photo is still too large after compression. Try a smaller image."));
        return;
      }
      resolve(dataUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image. Try a JPEG or PNG."));
    };
    img.src = url;
  });
}

function isTripCheckIn(message: ChatMessage) {
  return message.message.includes("📍 Trip check-in ·");
}

function getCheckInPreviewLines(message: string) {
  return message
    .split("\n")
    .filter((line) => !line.startsWith("📍 Trip check-in ·"));
}

function parseMapsLine(line: string) {
  const match = line.match(/(https:\/\/maps\.google\.com\/\?q=[^\s]+)(?:\s*·\s*(.*))?/);
  if (!match) return null;
  return {
    url: match[1],
    meta: match[2] ?? "",
  };
}

function CheckInPreview({
  message,
  photoLocationName,
}: {
  message: string;
  photoLocationName?: string | null;
}) {
  const lines = getCheckInPreviewLines(message);

  return (
    <div className="space-y-1 text-sm text-foreground/90 break-words">
      {lines.map((line, index) => {
        const maps = parseMapsLine(line);
        if (maps) {
          const isPhotoLocation = maps.meta === "Location from photo";
          const mapLabel = isPhotoLocation && photoLocationName ? photoLocationName : "Open in Maps";

          return (
            <div key={`${line}-${index}`} className="space-y-1">
              <a
                href={maps.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-italy-green/10 px-2.5 py-1 text-xs font-semibold text-italy-green hover:bg-italy-green/15"
              >
                <MapPin className="h-3.5 w-3.5" />
                <span className="truncate">{mapLabel}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              {maps.meta && <p className="text-xs text-muted-foreground">{maps.meta}</p>}
            </div>
          );
        }
        return (
          <p key={`${line}-${index}`} className="whitespace-pre-line">
            {line}
          </p>
        );
      })}
    </div>
  );
}

function formatTime(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatPhotoTakenAt(date: Date | string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;

  return d.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function CheckInCard({ location, isoDate }: CheckInCardProps) {
  const [customPlace, setCustomPlace] = useState("");
  const [checkInNote, setCheckInNote] = useState("");
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [detectedPhotoLocation, setDetectedPhotoLocation] = useState<PhotoLocation | null>(null);
  const [photoTakenAt, setPhotoTakenAt] = useState<string | null>(null);
  const [attachPhotoLocation, setAttachPhotoLocation] = useState(false);
  const [photoLocationSkipped, setPhotoLocationSkipped] = useState(false);
  const [isReadingPhotoLocation, setIsReadingPhotoLocation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"checkin" | "gallery">("checkin");
  const [pendingCheckIn, setPendingCheckIn] = useState<{ label: string; message: string } | null>(null);

  const checkIns = getDefaultCheckIns(location);

  const { data: messages = [] } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/messages"],
    enabled: drawerOpen && activeTab === "gallery",
    refetchInterval: drawerOpen && activeTab === "gallery" ? 3000 : false,
  });

  const checkInMessages = messages.filter(isTripCheckIn).reverse();
  const hasAttachedPhotoLocation = Boolean(photoPreview && attachPhotoLocation && detectedPhotoLocation);

  const checkInMutation = useMutation({
    mutationFn: async (payload: {
      message: string;
      photo?: string | null;
      photoTakenAt?: string | null;
      photoLatitude?: number | null;
      photoLongitude?: number | null;
    }) => {
      const res = await apiRequest("POST", "/api/chat/messages", {
        nickname: getNickname(),
        message: payload.message,
        ...(payload.photo ? { photo: payload.photo } : {}),
        ...(payload.photoTakenAt ? { photoTakenAt: payload.photoTakenAt } : {}),
        ...(payload.photoLatitude !== undefined && payload.photoLatitude !== null
          ? { photoLatitude: payload.photoLatitude }
          : {}),
        ...(payload.photoLongitude !== undefined && payload.photoLongitude !== null
          ? { photoLongitude: payload.photoLongitude }
          : {}),
      });
      return res.json();
    },
    onSuccess: (_data, payload) => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages"] });
      setLastCheckIn(payload.message);
      setCustomPlace("");
      setCheckInNote("");
      setPhotoPreview(null);
      setPhotoError(null);
      setDetectedPhotoLocation(null);
      setPhotoTakenAt(null);
      setAttachPhotoLocation(false);
      setPhotoLocationSkipped(false);
      setIsReadingPhotoLocation(false);
      setPendingCheckIn(null);
    },
  });

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (e.target) e.target.value = "";
    if (!file) return;

    setPhotoError(null);
    setDetectedPhotoLocation(null);
    setPhotoTakenAt(null);
    setAttachPhotoLocation(false);
    setPhotoLocationSkipped(false);
    setIsReadingPhotoLocation(false);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setPhotoError("Unsupported format. Use JPEG, PNG, or WebP.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setPhotoError("Photo is too large (max 10 MB before compression).");
      return;
    }

    try {
      setIsReadingPhotoLocation(true);
      const photoMetadataPromise = readPhotoMetadata(file);
      const dataUrl = await compressImage(file);
      setPhotoPreview(dataUrl);
      const photoMetadata = await photoMetadataPromise;
      setDetectedPhotoLocation(photoMetadata.location);
      setPhotoTakenAt(photoMetadata.takenAt);
    } catch (err) {
      setPhotoError(err instanceof Error ? err.message : "Failed to process photo.");
    } finally {
      setIsReadingPhotoLocation(false);
    }
  }, []);

  const removePhoto = useCallback(() => {
    setPhotoPreview(null);
    setPhotoError(null);
    setDetectedPhotoLocation(null);
    setPhotoTakenAt(null);
    setAttachPhotoLocation(false);
    setPhotoLocationSkipped(false);
    setIsReadingPhotoLocation(false);
  }, []);

  const withOptionalNote = (message: string) => {
    const note = checkInNote.trim();
    const notedMessage = note ? `${message}\n📝 ${note}` : message;

    if (hasAttachedPhotoLocation && detectedPhotoLocation) {
      return `${notedMessage}\n${detectedPhotoLocation.mapsUrl} · Location from photo`;
    }

    return notedMessage;
  };

  const sendCheckIn = (message: string) => {
    const stampedMessage = `${withOptionalNote(message)}\n📍 Trip check-in · ${isoDate}`;
    checkInMutation.mutate({
      message: stampedMessage,
      photo: photoPreview,
      photoTakenAt: photoPreview ? photoTakenAt : null,
      photoLatitude: hasAttachedPhotoLocation && detectedPhotoLocation
        ? Number(detectedPhotoLocation.lat)
        : null,
      photoLongitude: hasAttachedPhotoLocation && detectedPhotoLocation
        ? Number(detectedPhotoLocation.lng)
        : null,
    });
  };

  const getPendingMessage = () => {
    const place = customPlace.trim();
    if (place) return `Checked in at ${place} 📍`;
    if (pendingCheckIn) return pendingCheckIn.message;
    if (hasAttachedPhotoLocation) return "Photo location check-in 📍";
    return `Checked in at ${location} 📍`;
  };

  const postCheckIn = () => {
    const message = getPendingMessage();
    if (!message) return;

    sendCheckIn(message);
  };

  const canPostCheckIn = !isLocating && !checkInMutation.isPending;

  const sendCurrentLocation = () => {
    setLocationError(null);

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocationError("This browser does not support location check-ins.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const lat = latitude.toFixed(5);
        const lng = longitude.toFixed(5);
        const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
        const accuracyText = Number.isFinite(accuracy)
          ? `Approx ${Math.round(accuracy)}m accuracy`
          : "";
        setIsLocating(false);
        setPendingCheckIn({
          label: "Current GPS",
          message: `Live location check-in 📍\n${mapsUrl}${accuracyText ? `\n${accuracyText}` : ""}`,
        });
      },
      () => {
        setIsLocating(false);
        setLocationError("Location was blocked or unavailable. Manual check-in still works.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  };

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      {/* Compact strip trigger */}
      <DrawerTrigger asChild>
        <button
          type="button"
          className="w-full text-left rounded-xl border bg-card text-card-foreground overflow-hidden border-italy-green/20 bg-gradient-to-br from-white via-italy-cream/50 to-italy-green/10 p-3 sm:p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-italy-green/50 focus-visible:ring-offset-2"
          onClick={() => setDrawerOpen(true)}
          data-testid="button-open-check-in-drawer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-italy-green text-white shadow-sm flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-[0.15em] font-semibold text-italy-green">
                Crew check-in
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {lastCheckIn ? "Breadcrumb dropped ✓" : "Drop a breadcrumb"}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {checkInMessages.length > 0 && (
                <span className="text-[11px] text-muted-foreground bg-italy-green/10 px-2 py-0.5 rounded-full">
                  {checkInMessages.length}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </button>
      </DrawerTrigger>

      {/* Bottom-sheet drawer */}
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="font-serif text-xl text-center">
            <MapPin className="w-4 h-4 inline-block mr-1.5 text-italy-green" />
            Crew Check-in
          </DrawerTitle>
          <DrawerDescription className="text-center text-sm">
            {activeTab === "checkin"
              ? "Tap to log where the crew is"
              : `${checkInMessages.length} breadcrumb${checkInMessages.length === 1 ? "" : "s"} saved`}
          </DrawerDescription>
        </DrawerHeader>

        {/* Tab bar */}
        <div className="flex mx-4 mb-3 rounded-xl bg-muted/60 p-1">
          <button
            onClick={() => setActiveTab("checkin")}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors ${
              activeTab === "checkin"
                ? "bg-white text-italy-green shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Check In
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors ${
              activeTab === "gallery"
                ? "bg-white text-italy-green shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Images className="w-3.5 h-3.5" />
            Gallery
            {checkInMessages.length > 0 && (
              <span className="text-[10px] bg-italy-green/15 text-italy-green px-1.5 py-0.5 rounded-full leading-none">
                {checkInMessages.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab content */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="px-4 pb-6">
            {activeTab === "checkin" ? (
              <div className="space-y-3">
                {/* Preset buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {checkIns.map((item) => (
	                    <Button
	                      key={item.label}
	                      variant="outline"
	                      className={`justify-start rounded-2xl border-italy-green/20 hover:bg-italy-green/10 ${
	                        pendingCheckIn?.label === item.label
	                          ? "bg-italy-green/10 text-italy-green ring-1 ring-italy-green/30"
	                          : "bg-white/80"
	                      }`}
	                      onClick={() => setPendingCheckIn({ label: item.label, message: item.message })}
	                      disabled={checkInMutation.isPending}
	                      data-testid={`button-check-in-${item.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
	                    >
                      <span className="mr-2">{item.emoji}</span>
                      {item.label}
                    </Button>
                  ))}
                </div>

                {/* Note */}
                <div>
                  <Textarea
                    value={checkInNote}
                    onChange={(event) => setCheckInNote(event.target.value)}
                    placeholder="Optional note… line was fake scary, view was absurd, gelato was elite"
                    maxLength={180}
                    rows={2}
                    disabled={checkInMutation.isPending}
                    className="resize-none rounded-2xl bg-white/80 border-italy-green/20"
                    data-testid="textarea-check-in-note"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground text-right">
                    {checkInNote.length}/180
                  </p>
                </div>

                {/* Photo picker / preview */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                    className="hidden"
                    onChange={handleFileSelect}
                    data-testid="input-photo-file"
                  />
                  {photoPreview ? (
                    <div className="relative rounded-2xl overflow-hidden border border-italy-green/20 bg-white/80">
                      <img
                        src={photoPreview}
                        alt="Photo preview"
                        className="w-full max-h-40 object-cover"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
                        data-testid="button-remove-photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      {isReadingPhotoLocation && (
                        <div className="border-t border-italy-green/10 px-3 py-2 text-xs text-muted-foreground">
                          Checking photo location…
                        </div>
                      )}
                      {detectedPhotoLocation && !attachPhotoLocation && !photoLocationSkipped && (
                        <div className="space-y-2 border-t border-italy-green/10 bg-italy-green/5 px-3 py-2">
                          <div className="flex items-start gap-2 text-sm text-foreground">
                            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-italy-green" />
                            <div>
                              <p className="font-medium">Location found in this photo</p>
                              <p className="text-xs text-muted-foreground">Add it to this check-in?</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              size="sm"
                              className="h-8 rounded-full bg-italy-green px-3 text-xs hover:bg-italy-green/90"
                              onClick={() => {
                                setAttachPhotoLocation(true);
                                setPhotoLocationSkipped(false);
                              }}
                              disabled={checkInMutation.isPending}
                              data-testid="button-use-photo-location"
                            >
                              Use location
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="h-8 rounded-full bg-white/80 px-3 text-xs"
                              onClick={() => {
                                setAttachPhotoLocation(false);
                                setPhotoLocationSkipped(true);
                              }}
                              disabled={checkInMutation.isPending}
                              data-testid="button-skip-photo-location"
                            >
                              Skip
                            </Button>
                          </div>
                        </div>
                      )}
                      {detectedPhotoLocation && attachPhotoLocation && (
                        <div className="flex items-center justify-between gap-2 border-t border-italy-green/10 bg-italy-green/5 px-3 py-2 text-xs">
                          <span className="inline-flex items-center gap-1.5 font-medium text-italy-green">
                            <MapPin className="h-3.5 w-3.5" />
                            Location attached
                          </span>
                          <button
                            type="button"
                            className="font-medium text-muted-foreground hover:text-foreground"
                            onClick={() => {
                              setAttachPhotoLocation(false);
                              setPhotoLocationSkipped(true);
                            }}
                            disabled={checkInMutation.isPending}
                            data-testid="button-remove-photo-location"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full rounded-2xl bg-white/80 border-italy-green/20 hover:bg-italy-green/10"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={checkInMutation.isPending}
                      data-testid="button-add-photo"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Add a photo
                    </Button>
                  )}
                  {photoError && (
                    <div className="mt-2 flex items-start gap-2 rounded-2xl bg-italy-red/10 px-3 py-2 text-sm text-italy-red">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{photoError}</span>
                    </div>
                  )}
                </div>

                {/* Custom spot / GPS */}
                <div className="flex gap-2">
                  {!hasAttachedPhotoLocation && (
                    <Button
                      type="button"
                      size="icon"
                      variant={pendingCheckIn?.label === "Current GPS" ? "default" : "outline"}
                      className={`flex-shrink-0 rounded-2xl ${
                        pendingCheckIn?.label === "Current GPS"
                          ? "bg-italy-green hover:bg-italy-green/90"
                          : "bg-white/80 border-italy-green/20 hover:bg-italy-green/10"
                      }`}
                      onClick={sendCurrentLocation}
                      disabled={isLocating || checkInMutation.isPending}
                      aria-label="Use current GPS"
                      data-testid="button-gps-check-in"
                    >
                      <LocateFixed className="w-4 h-4" />
                    </Button>
                  )}
		                  <Input
		                    value={customPlace}
	                    onChange={(event) => {
	                      setCustomPlace(event.target.value);
	                      if (event.target.value.trim()) {
	                        setPendingCheckIn(null);
	                      }
	                    }}
	                    onKeyDown={(event) => {
	                      if (event.key === "Enter") {
	                        event.preventDefault();
	                        postCheckIn();
	                      }
	                    }}
	                    placeholder={hasAttachedPhotoLocation ? "Optional place name…" : "Custom spot…"}
	                    maxLength={60}
		                    disabled={checkInMutation.isPending}
		                    className="flex-1"
		                    data-testid="input-custom-check-in"
		                  />
		                </div>

                {pendingCheckIn?.label === "Current GPS" && !customPlace.trim() && (
                  <p className="px-1 text-xs font-medium text-italy-green">📍 GPS ready — tap Post</p>
                )}

	                <Button
	                  className="w-full rounded-2xl bg-italy-green hover:bg-italy-green/90"
	                  onClick={postCheckIn}
	                  disabled={!canPostCheckIn}
	                  data-testid="button-post-check-in"
	                >
	                  <Send className="w-4 h-4 mr-2" />
	                  {checkInMutation.isPending ? "Posting…" : "Post check-in"}
	                </Button>

                {locationError && (
                  <div className="flex items-start gap-2 rounded-2xl bg-italy-red/10 px-3 py-2 text-sm text-italy-red">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{locationError}</span>
                  </div>
                )}

                {lastCheckIn && (
                  <div className="flex items-start gap-2 rounded-2xl bg-italy-green/10 px-3 py-2 text-sm text-italy-green">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Checked in. Saved to the crew gallery.</span>
                  </div>
                )}
              </div>
            ) : (
              /* Gallery tab */
              <div className="space-y-3">
                {checkInMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
                    <Images className="h-12 w-12 text-italy-green/40" />
                    <p className="text-muted-foreground text-sm">
                      No check-ins yet. Drop a breadcrumb to start the gallery.
                    </p>
                  </div>
                ) : (
                  checkInMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="overflow-hidden rounded-2xl border border-italy-green/15 bg-gradient-to-br from-white to-italy-cream/60 shadow-sm"
                      data-testid={`gallery-check-in-${msg.id}`}
                    >
                      {msg.photo ? (
                        <img
                          src={msg.photo}
                          alt="Check-in photo"
                          className="w-full max-h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(msg.photo!, "_blank")}
                        />
                      ) : (
                        <div className="flex h-20 items-center justify-center bg-italy-green/10 text-italy-green">
                          <MapPin className="h-7 w-7" />
                        </div>
                      )}
                      <div className="p-3">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-semibold text-italy-green">{msg.nickname}</span>
                          <span className="text-[11px] text-muted-foreground">{formatTime(msg.createdAt)}</span>
                        </div>
                        <CheckInPreview message={msg.message} photoLocationName={msg.photoLocationName} />
                        {msg.photoTakenAt && formatPhotoTakenAt(msg.photoTakenAt) && (
                          <p className="mt-2 text-[11px] text-muted-foreground">
                            Taken {formatPhotoTakenAt(msg.photoTakenAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
