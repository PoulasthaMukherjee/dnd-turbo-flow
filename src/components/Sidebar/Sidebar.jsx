import "../Sidebar/sidebar.css";

export const NodeTypes = ["Input","Default","Output"]

export const Sidebar = () => {
    const onDragStart = (e, node) => {
        e.dataTransfer.setData("text/plain", node);
    };

    return (
        <div className="list-container">
            {NodeTypes.map((node, index) => (
                <div
                    key={index}
                    className={`node-list ${node} react-flow react-flow__node react-flow__node-turbo nopan`}
                    onDragStart={(e) => onDragStart(e, node)}
                    draggable
                >
                    <div className="wrapper ">
                        <div className="inner">
                        <span>Add {node === "Input" || node === "Output" ? "an" : "a"} {node} Node</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;