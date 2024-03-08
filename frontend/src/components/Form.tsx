type Props = {
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form = (props: Props) => {
  return (
    <div className="w-full h-1/4 flex justify-center">
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded w-2/5 h-10 p-2.5"
        placeholder="Enter the Link"
        required
        onChange={props.onChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/8 h-10 "
        onClick={props.onClick}
      >
        Go
      </button>
    </div>
  );
};

export default Form;
