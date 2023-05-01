const NoteForm = ({ fields: { note }, onSubmit}) => {
    return (
        <div>
            <h2>Create a New Note</h2>
            <form onSubmit={onSubmit}>
                <input value={note.value} onChange={({target}) => note.setValue(target.value)}/>
                <button type="submit">save</button>
            </form>            
        </div>
    )

}

export default NoteForm