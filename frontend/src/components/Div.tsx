import React from "react";

type Props = {
  url: {
    msg?: string;
    shortUrl?: string;
    status: number;
  } | null;
};

const Div: React.FC<Props> = (props) => {
  if (props.url) {
    if (props.url.status === 200 && props.url.shortUrl) {
      return (
        <div className="p-2 flex justify-center items-center gap-4">
          <h4 className="mb-2 mr-6" id={"myInput"}>
            http://localhost:5173/{props.url.shortUrl}
          </h4>
          <button
            type="button"
            className="text-white bg-gray-600 hover:bg-gray-900  font-medium rounded-full text-sm px-5 py-2.5 mb-2"
            onClick={() => {
              let copyText = document.getElementById("myInput");
              if (copyText) {
                navigator.clipboard.writeText(copyText.innerText);
              }
            }}
          >
            Copy
          </button>
        </div>
      );
    } else {
      return <div>{props.url.msg}</div>;
    }
  }
  return null;
};

export default Div;
