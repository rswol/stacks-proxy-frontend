import './Modal.css'
import { useRef, useEffect } from 'react'

export default function Modal({ children, modalCloseHandler }) {
  const modalRef = useRef(null);

  useEffect(() => {
    let handler = (event) => {
      const { current: wrap } = modalRef;
      if(wrap && !wrap.contains(event.target)) {
        modalCloseHandler()
      }
    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="overlay">
      <div className="modal-content" ref={modalRef}>
        { children }
      </div>
    </div>
  )
}