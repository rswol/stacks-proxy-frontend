import './Dropdown.css'
import { MdOutlineMenu } from 'react-icons/md'
import { useState, useRef, useEffect } from 'react'


export default function DropDown({ children }) {
  const [visible, setVisible] = useState(false)
  const dropdownRef = useRef(null);

  useEffect(() => {
    let handler = (event) => {
      const { current: wrap } = dropdownRef;
      if(wrap && !wrap.contains(event.target)) {
        closeDropdown()
      }
    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  
  function openDropdown() {
    setVisible(true)
    document.querySelector('.dropdown').classList.add('opened')
  }
  
  function closeDropdown() {
    setVisible(false)
    document.querySelector('.dropdown').classList.remove('opened')
  }

  return (
    <div className="menu" ref={dropdownRef}>
      <span onClick={visible ? closeDropdown : openDropdown}>
        <MdOutlineMenu size={25} color="rgb(var(--clr-black-100))" />
      </span>
      <div className="dropdown">
        { children }
      </div>
    </div>
  )
}