import React from 'react';

function PageShell({ title, subtitle, actions, children, compact = false }) {
  return (
    <section className="page-shell adinkra-page-border">
      <div className="adinkra-strip-top" aria-hidden="true" />
      <div className="adinkra-strip-bottom" aria-hidden="true" />
      <div className="adinkra-strip-left" aria-hidden="true" />
      <div className="adinkra-strip-right" aria-hidden="true" />

      <div className="adinkra-inner">
        <header className={`page-header ${compact ? 'page-header--compact' : ''}`}>
          <div className="page-header-row">
            <div>
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>
            {actions && <div className="page-header-actions">{actions}</div>}
          </div>
        </header>
        <div className={`page-body ${compact ? 'page-body--compact' : ''}`}>{children}</div>
      </div>
    </section>
  );
}

export default PageShell;
