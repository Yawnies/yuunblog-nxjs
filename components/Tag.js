const Tag = (props) => {

    if (props.tags == "gaming") {
        return (
            <span className=" bg-green-500 p-1 rounded-lg w-fit h-fit text-white font-bold text-sm">
                {props.tags.toUpperCase()}
            </span>
        )
    }

    if (props.tags == "misc") {
        return (
            <span className=" bg-indigo-500 p-1 rounded-lg w-fit h-fit text-white font-bold text-sm">
                {props.tags.toUpperCase()}
            </span>
        )
    }

    return (
        <span className=" bg-red-500 p-1 rounded-lg w-fit h-fit text-white font-bold text-sm">
            {props.tags.toUpperCase()}
        </span>
    );
}
 
export default Tag;