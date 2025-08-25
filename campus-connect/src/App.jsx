

// Main App component
// Renders the Navbar and Hero section inside a styled container

function App() {
  return (
    <div className="app-container">
      {/* Top navigation bar */}
      <Navbar />
      {/* Hero section with headline and CTA */}
      <Hero />
    </div>
  );
}

export default App
