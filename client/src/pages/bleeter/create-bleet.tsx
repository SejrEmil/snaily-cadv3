import * as React from "react";
import Layout from "../../components/Layout";
import State from "../../interfaces/State";
import lang from "../../language.json";
import AlertMessage from "../../components/alert-message";
import { connect } from "react-redux";
import { createBleet } from "../../lib/actions/bleeter";

interface Props {
  error: string;
  createBleet: (data: object) => void;
}

const CreateBleetPage: React.FC<Props> = ({ error, createBleet }) => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    createBleet({
      title,
      body,
    });
  }

  return (
    <Layout>
      {error ? <AlertMessage type="warning" message={error} dismissible /> : null}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">{lang.bleeter.bleet_title}</label>
          <input
            type="text"
            value={title}
            id="title"
            className="form-control bg-secondary border-secondary text-light"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">{lang.bleeter.bleet_body}</label>
          <textarea
            className="form-control bg-secondary border-secondary text-light"
            title="body"
            value={body}
            rows={10}
            style={{ resize: "vertical" }}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group float-right">
          <a className="btn btn-danger" href="/bleeter">
            {lang.global.cancel}
          </a>

          <button className="btn btn-primary ml-2" type="submit">
            {lang.bleeter.create_bleet}
          </button>
        </div>
      </form>
    </Layout>
  );
};

const mapToProps = (state: State) => ({
  error: state.bleets.error,
});

export default connect(mapToProps, { createBleet })(CreateBleetPage);
