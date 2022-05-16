function FormInput (props) {
    const {label,id,errors,handleChange,...inp} = props;
    return (
        <>
            <div className="formInput">
                <label className="reglabel">{label}</label>
                <span className="errmessg" >{errors}</span>
                <input {...inp} handleChange={handleChange} className="regInp" required/>
            </div>
        </>
    )
}

export default FormInput;