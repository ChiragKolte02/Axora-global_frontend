import React from "react";

const UnderMaintenance = () => {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      textAlign: "center",
      padding: "20px"
    }}>
      {/* Animated gear/cog icon */}
      <div style={{
        fontSize: "80px",
        marginBottom: "30px",
        animation: "spin 4s linear infinite",
      }}>
        ⚙️🔧
      </div>
      
      <h1 style={{
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        marginBottom: "20px",
        fontWeight: "700",
        letterSpacing: "-0.02em"
      }}>
        Under Maintenance
      </h1>
      
      <p style={{
        fontSize: "clamp(1rem, 3vw, 1.25rem)",
        marginBottom: "40px",
        opacity: 0.95,
        maxWidth: "500px",
        lineHeight: "1.6"
      }}>
        We're working hard to improve your experience. 
        We'll be back online shortly.
      </p>
      
      {/* Progress bar */}
      <div style={{
        width: "clamp(250px, 60%, 400px)",
        height: "4px",
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "30px"
      }}>
        <div style={{
          width: "65%",
          height: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
          animation: "loading 2s ease-in-out infinite",
        }} />
      </div>
      
      
     
      
      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default UnderMaintenance;