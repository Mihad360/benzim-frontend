"use client";

import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TermsEditor } from "../Editor";

// Dummy data - in real app, this would come from API based on ID
const dummyTermsData: Record<string, string> = {
  "1": "Welcome to our platform! These terms and conditions outline the rules and regulations for the use of our services.",
  "2": "By accessing this website, we assume you accept these terms and conditions in full.",
  "3": "We employ the use of cookies. By using our website you consent to the use of cookies in accordance with our privacy policy.",
};

export default function TermsCondition() {
  const router = useNavigate();
  const params = useParams();
  const id = params?.id as string;

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTermsData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Get data based on ID, fallback to first item if not found
        const termsText =
          dummyTermsData[id] ||
          dummyTermsData["1"] ||
          "No terms and conditions available.";

        setContent(termsText);
      } catch (error) {
        console.error("Error loading terms:", error);
        alert("Failed to load terms and conditions");
      } finally {
        setLoading(false);
      }
    };

    fetchTermsData();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call to save data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In real app, you would send this to your API
      console.log("Saving content for ID:", id);
      console.log("Content:", content);

      alert("Terms & Conditions saved successfully!");
      router("/dashboard/settings/terms-condition");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save terms and conditions");
    } finally {
      setSaving(false);
    }
  };

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  if (loading) {
    return (
      <div className="card" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="card-header">
          <h2>Edit Terms & Conditions</h2>
        </div>
        <div
          style={{
            minHeight: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#8c8c8c",
            }}
          >
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="card-header">
        <h2>Edit Terms & Conditions {id ? `(ID: ${id})` : ""}</h2>
      </div>
      <div
        className="card-body"
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TermsEditor content={content} onChange={handleContentChange} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "16px",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <button
            onClick={() => router("/dashboard/settings/terms-condition")}
            disabled={saving}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
