const ORDER_PER_PAGE = 3;
const BIO_PARAS_PER_PAGE = 2;
const PHOTOS_PER_PAGE = 4;

function chunk(array, size) {
  if (!array?.length) return [];
  const out = [];
  for (let i = 0; i < array.length; i += size) {
    out.push(array.slice(i, i + size));
  }
  return out;
}

function splitLongParagraph(text, maxLen = 280) {
  if (!text || text.length <= maxLen) return text ? [text] : [];
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const out = [];
  let current = '';
  for (const sentence of sentences) {
    const next = `${current}${sentence}`.trim();
    if (current && next.length > maxLen) {
      out.push(current.trim());
      current = sentence;
    } else {
      current = next;
    }
  }
  if (current.trim()) out.push(current.trim());
  return out.length ? out : [text];
}

function splitBiography(text) {
  const paras = (text || '').split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const expanded = paras.flatMap((p) => splitLongParagraph(p));
  return expanded.length ? expanded : [text || ''];
}

/**
 * Builds ordered flip pages: cover → TOC → content sections → back.
 * Each page fits one booklet sheet (no internal scrolling).
 */
export function buildBrochurePages(data) {
  const orderChunks = chunk(data.orderOfService || [], ORDER_PER_PAGE);
  const bioChunks = chunk(splitBiography(data.biography), BIO_PARAS_PER_PAGE);
  const photoChunks = chunk(data.collageUrls || [], PHOTOS_PER_PAGE);

  const content = [];

  orderChunks.forEach((items, i) => {
    content.push({
      type: 'order',
      id: `order-${i}`,
      items,
      part: i + 1,
      totalParts: orderChunks.length,
    });
  });

  bioChunks.forEach((paragraphs, i) => {
    content.push({
      type: 'tribute',
      id: `tribute-${i}`,
      paragraphs,
      part: i + 1,
      totalParts: bioChunks.length,
    });
  });

  if (photoChunks.length) {
    photoChunks.forEach((urls, i) => {
      content.push({
        type: 'gallery',
        id: `gallery-${i}`,
        urls,
        part: i + 1,
        totalParts: photoChunks.length,
      });
    });
  }

  content.push({ type: 'gratitude', id: 'gratitude' });
  content.push({ type: 'back', id: 'back' });

  const tocEntries = [];
  let pageNum = 3;

  if (orderChunks.length) {
    tocEntries.push({
      label: 'Order of Service',
      page: pageNum,
      endPage: pageNum + orderChunks.length - 1,
    });
    pageNum += orderChunks.length;
  }

  if (bioChunks.length) {
    tocEntries.push({
      label: 'Life Tribute & Obituary',
      page: pageNum,
      endPage: pageNum + bioChunks.length - 1,
    });
    pageNum += bioChunks.length;
  }

  if (photoChunks.length) {
    tocEntries.push({
      label: 'Family Memories',
      page: pageNum,
      endPage: pageNum + photoChunks.length - 1,
    });
    pageNum += photoChunks.length;
  }

  tocEntries.push({ label: 'Words of Gratitude', page: pageNum });
  pageNum += 1;

  tocEntries.push({ label: 'Burial & Reception', page: pageNum });

  const pages = [
    { type: 'cover', id: 'cover', title: 'Front cover' },
    { type: 'toc', id: 'toc', title: 'Table of contents', tocEntries },
    ...content.map((p) => ({
      ...p,
      title: pageTitle(p),
    })),
  ];

  return pages;
}

function pageTitle(page) {
  switch (page.type) {
    case 'order':
      return page.totalParts > 1 ? `Order of service (${page.part}/${page.totalParts})` : 'Order of service';
    case 'tribute':
      return page.totalParts > 1 ? `Life tribute (${page.part}/${page.totalParts})` : 'Life tribute';
    case 'gallery':
      return page.totalParts > 1 ? `Family memories (${page.part}/${page.totalParts})` : 'Family memories';
    case 'gratitude':
      return 'Words of gratitude';
    case 'back':
      return 'Back cover';
    default:
      return 'Page';
  }
}

export function getBrochurePageCount(data) {
  return buildBrochurePages(data).length;
}
