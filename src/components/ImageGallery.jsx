import React from 'react';

const captionize = (path) => {
  const fileName = path.split('/').pop().replace(/\.[^.]+$/, '');
  return fileName
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

function ImageGallery({ images }) {
  return (
    <section className="w-full max-w-[210mm] mt-10 bg-neutral-800 p-5 rounded-lg border border-amber-500/20 shadow-xl">
      <div className="mb-5">
        <h2 className="text-xl text-amber-500 font-bold tracking-wide mb-1">Photo Gallery</h2>
        <p className="text-sm text-neutral-400">Photos from the app asset folder with captions generated from file names.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map(({ path, url }) => (
          <figure key={path} className="overflow-hidden rounded-3xl border border-neutral-700 bg-black/50 shadow-inner">
            <img
              src={url}
              alt={captionize(path)}
              className="w-full h-44 object-cover transition-transform duration-200 hover:scale-105"
            />
            <figcaption className="px-3 py-3 text-xs text-neutral-300 bg-neutral-950/90 border-t border-neutral-700">
              {captionize(path)}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default ImageGallery;
