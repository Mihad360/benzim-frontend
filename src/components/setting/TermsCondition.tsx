"use client";

import { useState, useEffect, useCallback } from "react";
import { Button, Card, Spin, message } from "antd";
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
  const [messageApi, contextHolder] = message.useMessage();
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
        messageApi.error("Failed to load terms and conditions");
      } finally {
        setLoading(false);
      }
    };

    fetchTermsData();
  }, [id, messageApi]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call to save data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In real app, you would send this to your API
      console.log("Saving content for ID:", id);
      console.log("Content:", content);

      messageApi.success("Terms & Conditions saved successfully!");

      router("/dashboard/settings/terms-condition");
    } catch (error) {
      console.error("Error saving content:", error);
      messageApi.error("Failed to save terms and conditions");
    } finally {
      setSaving(false);
    }
  };

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  if (loading) {
    return (
      <Card
        title="Edit Terms & Conditions"
        style={{ maxWidth: 1280, margin: "0 auto" }}
      >
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
            <Spin />
            <span>Loading...</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      {contextHolder}
      <Card
        title={`Edit Terms & Conditions ${id ? `(ID: ${id})` : ""}`}
        style={{ maxWidth: 1280, margin: "0 auto" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
            <Button
              onClick={() => router("/dashboard/settings/terms-condition")}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="primary" onClick={handleSave} loading={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
