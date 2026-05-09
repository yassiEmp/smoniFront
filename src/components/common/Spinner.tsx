
const Spinner = ({ size = 32 }: { size?: number }) => (
  <div className="flex items-center justify-center w-full h-full py-8">
    <span
      className="inline-block animate-spin"
      style={{
        height: size,
        width: size,
        borderWidth: size / 8,
        borderColor: "#e0e0e0",
        borderTopColor: "#6C61F6",
        borderRadius: "50%",
        borderStyle: "solid",
        borderRightColor: "transparent",
      }}
    />
  </div>
);

export default Spinner;
