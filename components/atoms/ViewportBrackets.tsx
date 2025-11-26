'use client';

export default function ViewportBrackets() {
  const offset = 20; // المسافة من الحواف
  const bracketLength = 32; // طول كل ذراع من الإطار
  const bracketThickness = 2; // سماكة الخط

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 10, // أقل من الهيدر (99999) ولكن أعلى من المحتوى
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* Top Left - إطار L-shaped متصل */}
      <div
        style={{
          position: 'absolute',
          top: offset,
          left: offset,
          width: bracketLength + bracketThickness,
          height: bracketLength + bracketThickness,
        }}
      >
        {/* الخط الأفقي (أعلى) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: bracketLength,
            height: bracketThickness,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 0, 0, 0.3), 0 0 2px rgba(255, 255, 255, 0.8)',
          }}
        />
        {/* الخط العمودي (يسار) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: bracketThickness,
            height: bracketLength,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 0, 0, 0.3), 0 0 2px rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>

      {/* Top Right - إطار L-shaped متصل */}
      <div
        style={{
          position: 'absolute',
          top: offset,
          right: offset,
          width: bracketLength + bracketThickness,
          height: bracketLength + bracketThickness,
        }}
      >
        {/* الخط الأفقي (أعلى) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: bracketLength,
            height: bracketThickness,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 0, 0, 0.3), 0 0 2px rgba(255, 255, 255, 0.8)',
          }}
        />
        {/* الخط العمودي (يمين) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: bracketThickness,
            height: bracketLength,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 0, 0, 0.3), 0 0 2px rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>

      {/* Bottom Left - إطار L-shaped متصل */}
      <div
        style={{
          position: 'absolute',
          bottom: offset,
          left: offset,
          width: bracketLength + bracketThickness,
          height: bracketLength + bracketThickness,
        }}
      >
        {/* الخط العمودي (يسار) */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: bracketThickness,
            height: bracketLength,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 0, 0, 0.3), 0 0 2px rgba(255, 255, 255, 0.8)',
          }}
        />
        {/* الخط الأفقي (أسفل) */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: bracketLength,
            height: bracketThickness,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 0, 0, 0.3), 0 0 2px rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>

      {/* Bottom Right - إطار L-shaped متصل */}
      <div
        style={{
          position: 'absolute',
          bottom: offset,
          right: offset,
          width: bracketLength + bracketThickness,
          height: bracketLength + bracketThickness,
        }}
      >
        {/* الخط العمودي (يمين) */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: bracketThickness,
            height: bracketLength,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 0, 0, 0.3), 0 0 2px rgba(255, 255, 255, 0.8)',
          }}
        />
        {/* الخط الأفقي (أسفل) */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: bracketLength,
            height: bracketThickness,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 0, 0, 0.3), 0 0 2px rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>
    </div>
  );
}

