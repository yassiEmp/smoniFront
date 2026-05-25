import { ResponsivePicture } from "@/components/ui/responsive-picture";
import imgLabelQualite from "@assets/blog/details7/label-ecole-qualite.png?w=240;480&format=avif;webp;png&as=picture";

// Hoisted into its own module + lazy()'d by HomeCertificationSection so its
// 6 asset variants (avif/webp/png × 240w/480w) live in a separate chunk and
// don't get auto-preloaded by vite-react-ssg's renderPreloadLinks scan of
// the home route's static module graph. The badge is decorative — fetching
// after hydration is fine.
const HomeCertificationLabel = () => (
  <ResponsivePicture
    picture={imgLabelQualite}
    alt="Label École Conduite Qualité"
    sizes="(min-width: 768px) 224px, 160px"
    loading="lazy"
    decoding="async"
    className="w-40 md:w-56 h-auto relative z-10 drop-shadow-xl hover:rotate-3 transition-transform duration-500"
  />
);

export default HomeCertificationLabel;
