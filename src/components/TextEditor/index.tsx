import ReactQuill, { } from 'react-quill';
import 'react-quill/dist/quill.snow.css';


interface TextEditorProps {
    value: string;
    onChange: (arg: string) => void;
}

export function TextEditor(props: TextEditorProps) {


    return <ReactQuill className="rte-editor" theme="snow" value={props.value} onChange={props.onChange} />;
}