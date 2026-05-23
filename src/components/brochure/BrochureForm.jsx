import React from 'react';
import { createOrderItem } from '../../data/defaultBrochureData.js';

function BrochureForm({ data, onChange }) {
  const set = (key, value) => onChange({ ...data, [key]: value });

  const setOrderItem = (index, field, value) => {
    const orderOfService = data.orderOfService.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    onChange({ ...data, orderOfService });
  };

  const addOrderItem = () => {
    onChange({ ...data, orderOfService: [...data.orderOfService, createOrderItem()] });
  };

  const removeOrderItem = (index) => {
    if (data.orderOfService.length <= 1) return;
    onChange({
      ...data,
      orderOfService: data.orderOfService.filter((_, i) => i !== index),
    });
  };

  const readFileAsUrl = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <form
      className="brochure-form"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Brochure content editor"
    >
      <section className="brochure-form-section">
        <h3>Front Cover</h3>
        <label htmlFor="coverHeading">Heading</label>
        <input
          id="coverHeading"
          value={data.coverHeading}
          onChange={(e) => set('coverHeading', e.target.value)}
          placeholder="A Celebration of Life"
        />
        <label htmlFor="portrait">Portrait image</label>
        <input
          id="portrait"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) readFileAsUrl(file, (url) => set('portraitUrl', url));
          }}
        />
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          value={data.fullName}
          onChange={(e) => set('fullName', e.target.value)}
        />
        <label htmlFor="epithet">Title / epithet</label>
        <input
          id="epithet"
          value={data.epithet}
          onChange={(e) => set('epithet', e.target.value)}
        />
        <div className="brochure-form-row brochure-form-row--2">
          <div>
            <label htmlFor="birthDate">Birth date</label>
            <input
              id="birthDate"
              value={data.birthDate}
              onChange={(e) => set('birthDate', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="deathDate">Death date</label>
            <input
              id="deathDate"
              value={data.deathDate}
              onChange={(e) => set('deathDate', e.target.value)}
            />
          </div>
        </div>
        <label htmlFor="serviceVenue">Service venue</label>
        <input
          id="serviceVenue"
          value={data.serviceVenue}
          onChange={(e) => set('serviceVenue', e.target.value)}
        />
        <div className="brochure-form-row brochure-form-row--2">
          <div>
            <label htmlFor="serviceDate">Service date</label>
            <input
              id="serviceDate"
              value={data.serviceDate}
              onChange={(e) => set('serviceDate', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="serviceTime">Service time</label>
            <input
              id="serviceTime"
              value={data.serviceTime}
              onChange={(e) => set('serviceTime', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="brochure-form-section">
        <h3>Order of Service (Page 2)</h3>
        {data.orderOfService.map((item, index) => (
          <div key={item.id} className="brochure-order-row">
            <label>Time</label>
            <input
              value={item.time}
              onChange={(e) => setOrderItem(index, 'time', e.target.value)}
              placeholder="9:00 AM"
            />
            <label>Event title</label>
            <input
              value={item.title}
              onChange={(e) => setOrderItem(index, 'title', e.target.value)}
            />
            <label>Presenter / description</label>
            <input
              value={item.presenter}
              onChange={(e) => setOrderItem(index, 'presenter', e.target.value)}
            />
            <button
              type="button"
              className="brochure-form-btn brochure-form-btn--danger"
              onClick={() => removeOrderItem(index)}
            >
              Remove row
            </button>
          </div>
        ))}
        <button type="button" className="brochure-form-btn" onClick={addOrderItem}>
          + Add service item
        </button>
      </section>

      <section className="brochure-form-section">
        <h3>Life Tribute (Page 3)</h3>
        <label htmlFor="biography">Biography</label>
        <textarea
          id="biography"
          value={data.biography}
          onChange={(e) => set('biography', e.target.value)}
          rows={6}
        />
        <label htmlFor="collage">Collage photos</label>
        <input
          id="collage"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = [...(e.target.files || [])];
            if (!files.length) return;
            Promise.all(
              files.map(
                (file) =>
                  new Promise((resolve) => {
                    readFileAsUrl(file, resolve);
                  })
              )
            ).then((urls) => set('collageUrls', urls));
          }}
        />
      </section>

      <section className="brochure-form-section">
        <h3>Back Cover</h3>
        <label htmlFor="gratitudeNote">Words of gratitude</label>
        <textarea
          id="gratitudeNote"
          value={data.gratitudeNote}
          onChange={(e) => set('gratitudeNote', e.target.value)}
          rows={4}
        />
        <label htmlFor="intermentDetails">Interment / burial</label>
        <textarea
          id="intermentDetails"
          value={data.intermentDetails}
          onChange={(e) => set('intermentDetails', e.target.value)}
          rows={2}
        />
        <label htmlFor="repastAddress">Repast / reception</label>
        <textarea
          id="repastAddress"
          value={data.repastAddress}
          onChange={(e) => set('repastAddress', e.target.value)}
          rows={2}
        />
      </section>
    </form>
  );
}

export default BrochureForm;
