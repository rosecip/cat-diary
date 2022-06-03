import React from "react"

const DeleteDiaryEntry = (props) => {

  const deleteDiaryEntry = async () => {
      try {
        const response = await fetch(`/api/v1/diary-entries/${props.id}`, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json"
          })
        })
        if (!response.ok) {
          throw new Error(`${response.status} (${response.statusText})`)
        }
        props.handleDelete(props.id)
      } catch (error) {
        console.error(error)
      }
    }
  
    return (
      <div>
        <button className="button" onClick={deleteDiaryEntry}>delete</button>
      </div>
    )
  }

export default DeleteDiaryEntry