import React, { useState } from "react";
import "./todo-card.sass";
import { Todo } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPen,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface TodoCardProps {
  todo: Todo;
  index: number;
  onChange: (index: number, todo: Todo) => void;
  onDelete: (index: number) => void;
}

export const TodoCard = (props: TodoCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.todo.title);

  const onChangeComplete = ($event: React.FormEvent<HTMLInputElement>) => {
    props.onChange(props.index, {
      ...props.todo,
      completed: $event.currentTarget.checked,
    });
  };

  const onStartEditing = () => {
    setIsEditing(true);
  };

  const onStopEditing = () => {
    setIsEditing(false);
  };

  const onSave = () => {
    props.onChange(props.index, { ...props.todo, title });
    setIsEditing(false);
  };

  const onChangeTitle = ($event: React.FormEvent<HTMLInputElement>) => {
    setTitle($event.currentTarget.value);
  };

  const onDelete = () => {
    props.onDelete(props.index);
  };

  const isTitleInvalid = () => {
    if (!title) {
      return "Title is required";
    }

    if (title.length <= 2) {
      return "Title is too short";
    }

    return;
  };

  return (
    <div className="card todo-card" key={props.todo.id}>
      <header className="card-header">
        <div className="card-header-title">
          {isEditing ? (
            <div className="field">
              <div className="control">
                <input
                  className={`input ${isTitleInvalid() ? "is-danger" : ""}`}
                  type="text"
                  placeholder="Todo Title"
                  onChange={onChangeTitle}
                  value={title}
                />
              </div>
              {isTitleInvalid() && (
                <p className="help is-danger">{isTitleInvalid()}</p>
              )}
            </div>
          ) : (
            <label className="checkbox">
              <input
                type="checkbox"
                checked={props.todo.completed}
                onChange={onChangeComplete}
              />
              #{props.todo.id} {props.todo.title}
            </label>
          )}
        </div>
        {isEditing ? (
          <React.Fragment>
            <button
              disabled={!!isTitleInvalid()}
              className="card-header-icon"
              aria-label="more options"
              onClick={onSave}
            >
              <span className="icon has-text-success">
                <FontAwesomeIcon icon={faSave} />
              </span>
            </button>
            <button
              className="card-header-icon"
              aria-label="more options"
              onClick={onStopEditing}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button
              className="card-header-icon"
              aria-label="more options"
              onClick={onStartEditing}
            >
              <span className="icon has-text-info">
                <FontAwesomeIcon icon={faPen} />
              </span>
            </button>
            <button
              className="card-header-icon"
              aria-label="more options"
              onClick={onDelete}
            >
              <span className="icon has-text-danger">
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
            </button>
          </React.Fragment>
        )}
      </header>
    </div>
  );
};
