import { ResponsivePicture } from "@/components/ui/responsive-picture";
// AVIF/WebP shipped at 240w and 480w (retina); PNG fallback at 240w only.
// The badge renders at 160-224px CSS; PNG at 480w was 69 KB vs ~30 KB at
// 240w, and only browsers without AVIF/WebP (rare in 2026) see the PNG.
import imgLabelQualite from "@assets/blog/details7/label-ecole-qualite.png?w=240;480&format=avif;webp&as=picture";
import imgLabelQualiteFallback from "@assets/blog/details7/label-ecole-qualite.png?w=240&format=png";

// Hoisted into its own module + lazy()'d by HomeCertificationSection so its
// 6 asset variants (avif/webp/png × 240w/480w) live in a separate chunk and
// don't get auto-preloaded by vite-react-ssg's renderPreloadLinks scan of
// the home route's static module graph. The badge is decorative — fetching
// after hydration is fine.
const HomeCertificationLabel = () => (
  <ResponsivePicture
    picture={imgLabelQualite}
    fallbackSrc={imgLabelQualiteFallback}
    alt="Label École Conduite Qualité"
    sizes="(min-width: 768px) 224px, 160px"
    loading="lazy"
    decoding="async"
    className="w-40 md:w-56 h-auto relative z-10 drop-shadow-xl hover:rotate-3 transition-transform duration-500"
  />
);

export default HomeCertificationLabel;
