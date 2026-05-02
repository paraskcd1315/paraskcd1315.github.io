import { Modal } from "../../../../shared/components";
import type { GithubModalProps } from "./GithubModal.types";
import styles from "./GithubModal.module.scss";

export default function GithubModal({ open, onClose }: GithubModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="GitHub"
      subtitle="Public repositories"
    >
      <div className={styles.placeholder}>
        <p>GitHub modal scaffolded — content lands in PORT-120/121/122/123.</p>
      </div>
    </Modal>
  );
}
