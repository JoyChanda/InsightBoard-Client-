/**
 * ColorPalette Component
 * Displays all theme colors for reference and testing
 * Useful during development to visualize the color system
 */
const ColorPalette = () => {
  const colors = [
    { name: "Primary (Indigo)", class: "bg-primary", textClass: "text-primary" },
    { name: "Secondary (Purple)", class: "bg-secondary", textClass: "text-secondary" },
    { name: "Accent (Green)", class: "bg-accent", textClass: "text-accent" },
  ];

  const baseColors = [
    { name: "Base 100", class: "bg-base-100", border: true },
    { name: "Base 200", class: "bg-base-200", border: true },
    { name: "Base 300", class: "bg-base-300", border: true },
    { name: "Base Content", class: "bg-base-content" },
  ];

  return (
    <div className="p-8 bg-base-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-base-content mb-8">
          InsightBoard Color Palette
        </h1>

        {/* Primary Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Primary Colors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {colors.map((color) => (
              <div key={color.name} className="space-y-3">
                {/* Color Swatch */}
                <div
                  className={`${color.class} h-32 rounded-lg shadow-lg flex items-center justify-center`}
                >
                  <span className="text-white font-semibold text-lg">
                    {color.name}
                  </span>
                </div>

                {/* Usage Examples */}
                <div className="space-y-2">
                  <button
                    className={`w-full ${color.class} hover:opacity-90 text-white px-4 py-2 rounded-lg transition`}
                  >
                    Button
                  </button>
                  <div
                    className={`w-full border-2 ${color.textClass} border-current px-4 py-2 rounded-lg text-center`}
                  >
                    Outline
                  </div>
                  <div
                    className={`w-full ${color.class}/10 ${color.textClass} px-4 py-2 rounded-lg text-center`}
                  >
                    Badge
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Base Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Base Colors (Theme-Aware)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {baseColors.map((color) => (
              <div
                key={color.name}
                className={`${color.class} ${
                  color.border ? "border-2 border-base-300" : ""
                } h-24 rounded-lg shadow-md flex items-center justify-center`}
              >
                <span
                  className={`font-semibold ${
                    color.name === "Base Content"
                      ? "text-base-100"
                      : "text-base-content"
                  }`}
                >
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Opacity Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Opacity Variants
          </h2>
          <div className="space-y-6">
            {colors.map((color) => (
              <div key={color.name}>
                <h3 className="text-lg font-medium text-base-content mb-3">
                  {color.name}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[100, 90, 70, 50, 30, 20, 10].map((opacity) => (
                    <div
                      key={opacity}
                      className={`${color.class}/${opacity} h-20 rounded-lg flex items-center justify-center border border-base-300`}
                    >
                      <span className="text-base-content font-medium">
                        {opacity}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Component Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Component Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Example */}
            <div className="bg-base-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-base-content mb-2">
                Example Card
              </h3>
              <p className="text-base-content/80 mb-4">
                This card uses base colors for theme-aware styling.
              </p>
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition">
                Primary Action
              </button>
            </div>

            {/* Alert Example */}
            <div className="bg-accent/10 border-2 border-accent p-6 rounded-lg">
              <h3 className="text-xl font-bold text-accent mb-2">
                Success Alert
              </h3>
              <p className="text-base-content/80">
                Using accent color for positive feedback.
              </p>
            </div>
          </div>
        </section>

        {/* Usage Note */}
        <div className="mt-12 p-6 bg-base-200 rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-semibold text-base-content mb-2">
            💡 Usage Note
          </h3>
          <p className="text-base-content/80">
            This component is for development reference only. Remove it from
            production builds. Toggle between light and dark modes to see how
            colors adapt automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
