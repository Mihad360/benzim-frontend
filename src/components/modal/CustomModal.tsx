import { Modal } from "antd";

// In your CustomModal component
type TCustomModalProps = {
  title: string;
  open: boolean; // Make sure this exists
  onCancel: () => void;
  footer: boolean | React.ReactNode;
  width?: number;
  centered?: boolean;
  children: React.ReactNode;
};

export const CustomModal = ({
  title,
  open,
  onCancel,
  footer,
  width,
  centered,
  children,
}: TCustomModalProps) => {
  return (
    <Modal
      title={title}
      open={open} // Map visible to open for Ant Design
      onCancel={onCancel}
      footer={footer}
      width={width}
      centered={centered}
    >
      {children}
    </Modal>
  );
};
