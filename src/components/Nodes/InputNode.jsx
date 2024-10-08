import { memo } from "react";
import { Handle, Position } from "reactflow";
import { FiCloud } from 'react-icons/fi';

const InputNode = memo(() => {
    return (
        <>
            <div className="cloud gradient">
                <div>
                    <FiCloud />
                </div>
            </div>
            <div className="wrapper gradient">
                <div className="inner">
                    <div className="body">
                        {/* <div className="icon"></div> */}
                        <div>
                            <div className="title">Input Node</div>
                            {/* <div className="subline"></div> */}
                        </div>
                    </div>
                </div>
            </div>
            <Handle type="source" position={Position.Right} />
        </>
    );
});

export default InputNode;