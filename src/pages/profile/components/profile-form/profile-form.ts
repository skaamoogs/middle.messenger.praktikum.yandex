import Handlebars from "handlebars";
import Button from "../../../../components/button/button";
import ErrorMessage from "../../../../components/error-message/error-message";
import { ROUTES } from "../../../../const";
import Block from "../../../../modules/block";
import { Events } from "../../../../utils/type";
import {
  checkPasswords,
  formValidator,
  logData,
} from "../../../../utils/validate";
import PasswordFields from "../password-fields/password-fields";
import UserFields from "../user-fields/user-fields";
import profileFormProps from "./profile-form.props";
import profileFormTemplate from "./profile-form.tmpl";

const { pathname } = window.location;

type TProfileFormProps = typeof profileFormProps;

interface ProfileFormProps extends TProfileFormProps {
  events?: Events;
}

export default class ProfileForm extends Block<ProfileFormProps> {
  constructor() {
    super({
      ...profileFormProps,
      events: {
        submit: (event: Event) => this.validate(event),
        focusin: () => this.clearError(),
        keyup: (event: Event) => this.checkPassword(event),
      },
    });
  }

  init() {
    const { saveButtonProps } = this.props;

    this.children.error = new ErrorMessage({ text: "" });

    this.children.errorPassword = new ErrorMessage({ text: "" });

    switch (pathname) {
      case ROUTES.profile: {
        this.children.user = new UserFields({ validation: false });
        const user = this.children.user as UserFields;
        const inputs = user.getContent()?.querySelectorAll("input");
        inputs?.forEach((input) => {
          input.setAttribute("readonly", "readonly");
        });
        break;
      }
      case ROUTES.password: {
        this.children.password = new PasswordFields();
        this.children.saveButton = new Button({ ...saveButtonProps });
        break;
      }
      case ROUTES.data: {
        this.children.user = new UserFields({ validation: true });
        this.children.saveButton = new Button({ ...saveButtonProps });
        break;
      }
      default:
        break;
    }
  }

  findInputFields() {
    if (pathname === ROUTES.data) {
      const user = this.children.user as UserFields;
      return user.children.inputs as Block[];
    }
    if (pathname === ROUTES.password) {
      const password = this.children.password as PasswordFields;
      return password.children.inputs as Block[];
    }
    return null;
  }

  validate(event: Event) {
    const error = this.children.error as ErrorMessage;
    const fields = this.findInputFields();
    const test = formValidator(fields as Block[]);
    event.preventDefault();

    if (!test) {
      error.setProps({ text: "?????????????????? ???????? ?????????????????? ??????????????." });
      error.show();
    } else {
      const data = logData(this);
      // eslint-disable-next-line no-console
      console.log(data);
    }
  }

  checkPassword(event) {
    const errorPassword = this.children.errorPassword as ErrorMessage;
    const input = event.target as HTMLInputElement;
    if (input.name === "confirmPassword") {
      const fields = this.findInputFields();
      if (fields) {
        const test = checkPasswords(fields);
        if (!test) {
          errorPassword.setProps({ text: "???????????? ???? ??????????????????" });
          errorPassword.show();
        } else {
          errorPassword.hide();
        }
      }
    }
  }

  clearError() {
    const error = this.children.error as ErrorMessage;
    error.hide();
  }

  render() {
    const template = Handlebars.compile(profileFormTemplate);
    return this.compile(template, { ...this.props });
  }
}
