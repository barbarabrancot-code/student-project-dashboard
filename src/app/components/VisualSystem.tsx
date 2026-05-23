export default function VisualSystem() {
  return (
    <div className="w-[375px] bg-white p-6 space-y-8">
      <div>
        <h1 className="mb-6 pb-2 border-b-2 border-gray-900">Visual System</h1>
      </div>

      {/* Typography */}
      <section className="space-y-4">
        <h3 className="text-gray-500 uppercase tracking-wide text-xs">Typography</h3>

        <div className="space-y-3">
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-gray-500 w-24">H1 / 20px</span>
            <h1 className="flex-1">Heading 1 - Medium</h1>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-xs text-gray-500 w-24">H2 / 18px</span>
            <h2 className="flex-1">Heading 2 - Medium</h2>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-xs text-gray-500 w-24">H3 / 16px</span>
            <h3 className="flex-1">Heading 3 - Medium</h3>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-xs text-gray-500 w-24">Body / 14px</span>
            <p className="flex-1 text-sm">Body text - Regular</p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-xs text-gray-500 w-24">Label / 12px</span>
            <span className="flex-1 text-xs">Label text - Regular</span>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-xs text-gray-500 w-24">Caption / 10px</span>
            <span className="flex-1 text-[10px]">Caption text - Regular</span>
          </div>
        </div>
      </section>

      {/* Spacing Scale */}
      <section className="space-y-4">
        <h3 className="text-gray-500 uppercase tracking-wide text-xs">Spacing Scale</h3>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 w-24">4px</span>
            <div className="h-6 w-1 bg-blue-500"></div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 w-24">8px</span>
            <div className="h-6 w-2 bg-blue-500"></div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 w-24">12px</span>
            <div className="h-6 w-3 bg-blue-500"></div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 w-24">16px</span>
            <div className="h-6 w-4 bg-blue-500"></div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 w-24">24px</span>
            <div className="h-6 w-6 bg-blue-500"></div>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">Section spacing (mb-6):</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 w-24">24px</span>
            <div className="h-6 w-6 bg-gray-300"></div>
          </div>
        </div>
      </section>

      {/* Corner Radius */}
      <section className="space-y-4">
        <h3 className="text-gray-500 uppercase tracking-wide text-xs">Corner Radius</h3>

        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 w-24">4px (sm)</span>
            <div className="h-12 w-20 bg-gray-300 rounded"></div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 w-24">8px (default)</span>
            <div className="h-12 w-20 bg-gray-300 rounded-lg"></div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 w-24">Full (pills)</span>
            <div className="h-8 w-32 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="space-y-4">
        <h3 className="text-gray-500 uppercase tracking-wide text-xs">Colors</h3>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-600 mb-2">Backgrounds</p>
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="h-12 bg-white border-2 border-gray-300 rounded mb-1"></div>
                <span className="text-[10px] text-gray-500">White</span>
              </div>
              <div className="flex-1">
                <div className="h-12 bg-gray-50 border border-gray-200 rounded mb-1"></div>
                <span className="text-[10px] text-gray-500">Gray-50</span>
              </div>
              <div className="flex-1">
                <div className="h-12 bg-gray-100 border border-gray-200 rounded mb-1"></div>
                <span className="text-[10px] text-gray-500">Gray-100</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-2">Borders</p>
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="h-12 border-2 border-gray-200 rounded mb-1"></div>
                <span className="text-[10px] text-gray-500">Gray-200</span>
              </div>
              <div className="flex-1">
                <div className="h-12 border-2 border-gray-300 rounded mb-1"></div>
                <span className="text-[10px] text-gray-500">Gray-300</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-2">Accent (Primary)</p>
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="h-12 bg-blue-500 rounded mb-1"></div>
                <span className="text-[10px] text-gray-500">Blue-500</span>
              </div>
              <div className="flex-1">
                <div className="h-12 bg-blue-50 border border-blue-500 rounded mb-1"></div>
                <span className="text-[10px] text-gray-500">Blue-50</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-2">Status Colors</p>
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="h-12 bg-amber-100 border border-amber-300 rounded mb-1"></div>
                <span className="text-[10px] text-gray-500">Warning</span>
              </div>
              <div className="flex-1">
                <div className="h-12 bg-green-100 border border-green-300 rounded mb-1"></div>
                <span className="text-[10px] text-gray-500">Success</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-2">Text Colors</p>
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="h-12 bg-gray-900 rounded mb-1"></div>
                <span className="text-[10px] text-gray-500">Primary</span>
              </div>
              <div className="flex-1">
                <div className="h-12 bg-gray-600 rounded mb-1"></div>
                <span className="text-[10px] text-gray-500">Secondary</span>
              </div>
              <div className="flex-1">
                <div className="h-12 bg-gray-400 rounded mb-1"></div>
                <span className="text-[10px] text-gray-500">Disabled</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h3 className="text-gray-500 uppercase tracking-wide text-xs">Buttons</h3>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-600 mb-2">Primary Filled</p>
            <button className="w-full py-3 bg-blue-500 text-white rounded-lg">
              Button Text
            </button>
            <p className="text-[10px] text-gray-500 mt-1">bg-blue-500, py-3, rounded-lg</p>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-2">Secondary Outlined</p>
            <button className="w-full py-3 bg-white border-2 border-gray-300 text-gray-900 rounded-lg">
              Button Text
            </button>
            <p className="text-[10px] text-gray-500 mt-1">border-2 border-gray-300, py-3, rounded-lg</p>
          </div>
        </div>
      </section>

      {/* Pills/Tags */}
      <section className="space-y-4">
        <h3 className="text-gray-500 uppercase tracking-wide text-xs">Pills / Tags</h3>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-600 mb-2">Default Tag</p>
            <span className="inline-block px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
              Tag Label
            </span>
            <p className="text-[10px] text-gray-500 mt-1">px-3 py-1, bg-gray-200, rounded-full</p>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-2">Status Tag (Warning)</p>
            <span className="inline-block px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs text-amber-800">
              Em andamento
            </span>
            <p className="text-[10px] text-gray-500 mt-1">bg-amber-100, border-amber-300</p>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <h3 className="text-gray-500 uppercase tracking-wide text-xs">Cards</h3>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-600 mb-2">Default Card</p>
            <div className="p-4 border-2 border-gray-300 rounded-lg bg-gray-50">
              Card content
            </div>
            <p className="text-[10px] text-gray-500 mt-1">border-2 border-gray-300, rounded-lg, p-4</p>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-2">Highlighted Card</p>
            <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
              Highlighted content
            </div>
            <p className="text-[10px] text-gray-500 mt-1">border-2 border-blue-500, bg-blue-50</p>
          </div>
        </div>
      </section>

      {/* Icons */}
      <section className="space-y-4">
        <h3 className="text-gray-500 uppercase tracking-wide text-xs">Icons</h3>

        <div className="flex gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </div>
            <span className="text-[10px] text-gray-500">24x24px</span>
          </div>

          <div className="text-center">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <span className="text-[10px] text-gray-500">20x20px</span>
          </div>

          <div className="text-center">
            <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <span className="text-[10px] text-gray-500">16x16px</span>
          </div>
        </div>
      </section>

      {/* Navigation Pattern */}
      <section className="space-y-4">
        <h3 className="text-gray-500 uppercase tracking-wide text-xs">Navigation Bar</h3>

        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-white border-b border-gray-300 p-3 flex justify-around">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 text-blue-500 mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <span className="text-xs text-blue-500">Active</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-6 h-6 text-gray-400 mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <span className="text-xs text-gray-400">Inactive</span>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-gray-500">Active: text-blue-500 | Inactive: text-gray-400</p>
      </section>
    </div>
  );
}
