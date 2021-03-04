import React, { useState } from "react";
import "./todo-add-card.sass";
import { Todo } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

interface TodoAddCardProps {
  onCreate: (todo: Todo) => void;
}

export const TodoAddCard = (props: TodoAddCardProps) => {
  const [title, setTitle] = useState("");
  const [submited, setSubmited] = useState(false);

  const onCreate = () => {
    setSubmited(true);
    if (isTitleInvalid()) {
      return;
    }

    props.onCreate({ title, completed: false });
    setTitle("");
    setSubmited(false);
  };

  const onChangeTitle = ($event: React.FormEvent<HTMLInputElement>) => {
    setTitle($event.currentTarget.value);
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
    <div className="card todo-card">
      <header className="card-header">
        <div className="card-header-title">
          <div className="field">
            <div className="control">
              <input
                type="text"
                className={`input ${
                  submited && isTitleInvalid() ? "is-danger" : ""
                }`}
                placeholder="Todo Title"
                onChange={onChangeTitle}
                value={title}
              />
            </div>
            {submited && isTitleInvalid() && (
              <p className="help is-danger">{isTitleInvalid()}</p>
            )}
          </div>
        </div>
        <button
          className="card-header-icon"
          aria-label="more options"
          onClick={onCreate}
        >
          <span className="icon has-text-success">
            <FontAwesomeIcon icon={faPlusCircle} />
          </span>
        </button>
      </header>
    </div>
  );
};
