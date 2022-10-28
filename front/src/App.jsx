import { Formik, Form, Field, ErrorMessage, FormikConsumer } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import './App.css';

function App() {
  function clearInputs(){
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('email2').value = '';
    document.getElementById('password2').value = '';
    document.getElementById('password3').value = '';
  };
  const handleClick = () => {
    if(document.getElementById('login-link').style.display == 'block'){
      document.getElementById('login-link').style.display = 'none';
      document.getElementById('menu-btnC').style.display = 'none';
      document.getElementById('cadastro-link').style.display = 'block';
      document.getElementById('menu-btnL').style.display = 'block';
    }else{
      document.getElementById('login-link').style.display = 'block';
      document.getElementById('menu-btnC').style.display = 'block';
      document.getElementById('cadastro-link').style.display = 'none';
      document.getElementById('menu-btnL').style.display = 'none';
    }
  };
  
  const handleClickLogin = (values) =>{
    axios.post("http://localhost:3000/login", {
      email: values.email,
      password: values.password,
    }).then((response)=> {
        alert(response.data.msg);
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    clearInputs();
  };

  const handleClickRegister = (values) =>{
    axios.post("http://localhost:3000/register", {
        email: values.email,
        password: values.password,
    }).then((response)=> {
        alert(response.data.msg);
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    clearInputs();
  };

  const validationLogin = yup.object().shape({
    email: yup.string().email("Não éum email!").required("Este campo é obrigatório!"),
    password: yup.string().min(5, "minimo 5 caracteres!").required("Este campo é obrigatório!"),
  });
  const validationRegister = yup.object().shape({
    email: yup.string().email("Não éum email!").required("Este campo é obrigatório!"),
    password: yup.string().min(5, "minimo 5 caracteres!").required("Este campo é obrigatório!"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais!") 
  });

  return (
    <div className='container'>
        <button id='menu-btnL' className="menu-btnL" onClick={handleClick}>Ir para Login</button>
        <button id='menu-btnC' className="menu-btnC" onClick={handleClick}>Ir para Cadastro</button>
        <div className="login-link" id="login-link">
          <Formik className="login-link" initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
            <Form className="login-form">
              <div className="login-form-group">
                <Field id="email" name="email" className="form-field" placeholder="Email aqui" />
                <ErrorMessage component="span" name="name" className="form-error"/>
              </div>
              <div className="login-form-group">
                <Field id="password" type="password" name="password" className="form-field" placeholder="Senha aqui" />
                <ErrorMessage component="span" name="password" className="form-error"/>
              </div>
              <button className="button" type="submit" >Login</button>
            </Form>
          </Formik>
        </div>
        <div className="cadastro-link" id="cadastro-link">
          <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
            <Form className="login-form">
              <div className="login-form-group">
                <Field id="email2" name="email" className="form-field" placeholder="Email aqui" />
                <ErrorMessage component="span" name="name" className="form-error"/>
              </div>
              <div className="login-form-group">
                <Field id="password2" type="password" name="password" className="form-field" placeholder="Senha aqui" />
                <ErrorMessage component="span" name="password" className="form-error"/>
              </div>
              <div className="login-form-group">
                <Field id="password3" type="password" name="confirmPassword" className="form-field" placeholder="Confirme sua senha" />
                <ErrorMessage component="span" name="confirmPassword" className="form-error"/>
              </div>
              <button className="button" type="submit" >Cadastrar</button>
            </Form>
          </Formik>
        </div>
    </div>
  )
}
export default App;
