export default function Cabecalho2(props) {
  return (
    <>
      <nav className="d-flex" style={{ fontSize: "22px" }}>
        <div className="py-2 px-2 text-white" style={{ backgroundColor: "#E3B320", height: "50px",
      minWidth: "fit-content" }}>
          {props.texto1}
        </div>
        <div className="w-100 py-2 px-2" style={{ backgroundColor: "#D9D9D9" }}>
        {props.texto2}
        </div>
      </nav>
    </>
  );
}
