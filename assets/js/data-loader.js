/*
 * Loads the public portfolio data from static JSON files.
 * No backend, no framework. GitHub Pages only needs these files to exist.
 *
 * Because browsers block fetch() from file:// pages, open the site through a
 * local HTTP server while developing (see README.md).
 */
(function () {
  "use strict";

  const DATA_FILES = {
    certifications: "data/public/certifications.json",
    experience: "data/public/experience.json",
    projects: "data/public/projects.json",
    profiles: "data/public/profiles.json"
  };

  window.portfolioData = null;

  function arrayOrEmpty(value) {
    return Array.isArray(value) ? value : [];
  }

  function validate(key, payload) {
    if (key === "certifications") {
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        throw new Error("certifications.json must contain an object");
      }
      return {
        certifications: arrayOrEmpty(payload.certifications),
        academic: arrayOrEmpty(payload.academic)
      };
    }
    if (!Array.isArray(payload)) {
      throw new Error(key + ".json must contain an array");
    }
    return payload;
  }

  async function fetchJson(path) {
    const response = await fetch(path, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error("HTTP " + response.status + " for " + path);
    }
    return response.json();
  }

  async function loadPortfolioData() {
    const entries = Object.keys(DATA_FILES);
    const settled = await Promise.all(entries.map(async function (key) {
      const path = DATA_FILES[key];
      try {
        return { key: key, path: path, value: validate(key, await fetchJson(path)) };
      } catch (error) {
        return { key: key, path: path, error: error };
      }
    }));

    const failures = settled.filter(function (item) { return item.error; });
    if (failures.length) {
      window.portfolioData = null;
      document.dispatchEvent(new CustomEvent("portfolio:error", {
        detail: failures.map(function (item) {
          return { key: item.key, path: item.path, message: item.error.message };
        })
      }));
      return null;
    }

    const data = {};
    settled.forEach(function (item) {
      // certifications.json holds both arrays; expose them as siblings.
      if (item.key === "certifications") Object.assign(data, item.value);
      else data[item.key] = item.value;
    });
    window.portfolioData = data;
    document.dispatchEvent(new CustomEvent("portfolio:ready", { detail: data }));
    return data;
  }

  window.loadPortfolioData = loadPortfolioData;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadPortfolioData, { once: true });
  } else {
    loadPortfolioData();
  }
}());
