export default function Wrapper({ children }) {
  let wrapperStyles = {
    maxWidth: "1080px",
    width: "96%",
    marginInline: "auto"
  }

  return (
    <div style={wrapperStyles}>
      { children }
    </div>
  )
}