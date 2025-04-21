import React from 'react';

export default function FontTest() {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-bold">Font Test Component</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl mb-2">Ela Sans (Default Body Font)</h3>
          <p className="font-elaSans text-lg">
            This text is using the Ela Sans font. The quick brown fox jumps over the lazy dog.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl mb-2">Arioso (Default Heading Font)</h3>
          <p className="font-arioso text-lg">
            This text is using the Arioso font. The quick brown fox jumps over the lazy dog.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl mb-2">Berling Nova Sans W04 Regular (New Font)</h3>
          <p className="font-berling-nova text-lg">
            This text is using the Berling Nova Sans W04 Regular font. The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>
    </div>
  );
}
