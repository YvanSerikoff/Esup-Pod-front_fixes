export const DEFAULT_ALLOWED_VIDEO_EXTENSIONS = ".mp4, .avi, .mkv,";
export const DEFAULT_ALLOWED_IMAGE_EXTENSIONS = ".jpg, .jpeg, .png, .webp";
export const DEFAULT_ALLOWED_SUBTITLE_EXTENSIONS = ".vtt, .srt";

export function getAllowedFileExtensions(
  extensions: string[] | undefined,
  defaultExtensions: string,
): string {
  return (
    extensions?.map((extension) => `.${extension}`).join(", ") ||
    defaultExtensions
  );
}
