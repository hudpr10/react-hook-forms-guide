import { useForm } from "react-hook-form";
import validator from "validator";

const GoodForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(errors);

  // Monitorando um input especifico
  // Ele renderiza toda vez, use com sabedoria
  const watchPassword = watch("password");

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Nome</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome"
          // Para começar a usar o react-hook-forms deve colocar {...register("")} em todos!
          // Segundo parametro são regras do input
          {...register("name", {
            required: true,
          })}
        />
        {errors?.name?.type === "required" && (
          <p className="error-message">O campo de nome não pode ficar vazio</p>
        )}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register("email", {
            required: true,
            validate: (value) => validator.isEmail(value),
          })}
        />
        {errors?.email?.type === "required" && (
          <p className="error-message">
            O campo de e-mail não pode ficar vazio
          </p>
        )}

        {errors?.email?.type === "validate" && (
          <p className="error-message">Digite um e-mail valido</p>
        )}
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          {...register("password", { minLength: 8, required: true })}
        />
        {errors?.password?.type === "minLength" && (
          <p className="error-message">A senha deve ter pelo menos 8 digitos</p>
        )}
        {errors?.password?.type === "required" && (
          <p className="error-message">O campo de senha não pode ficar vazio</p>
        )}
      </div>

      <div className="form-group">
        <label>Confirme sua Senha</label>
        <input
          className={errors?.passwordConfirmation && "input-error"}
          type="password"
          placeholder="Digite sua senha novamente"
          {...register("passwordConfirmation", {
            required: true,
            validate: (value) => value === watchPassword,
          })}
        />
        {errors?.passwordConfirmation?.type === "required" && (
          <p className="error-message">O campo de senha não pode ficar vazio</p>
        )}
        {errors?.passwordConfirmation?.type === "validate" && (
          <p className="error-message">As senhas devem ser iguais</p>
        )}
      </div>

      <div className="form-group">
        <label>Profissão</label>
        <select
          className={errors?.profession && "input-error"}
          // Criando excessão customizada
          // Value = valor do input ao ser enviado
          {...register("profession", { validate: (value) => value !== "0" })}
        >
          <option value="0">Selecione sua profissão...</option>
          <option value="developer">Desenvolvedor</option>
          <option value="other">Outra</option>
        </select>

        {errors?.profession?.type === "validate" && (
          <p className="error-message">Escolha uma profissão</p>
        )}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register("privacyTerms", { required: true })}
          />
          <label>Eu concordo com os termos de privacidade.</label>
        </div>

        {errors?.privacyTerms?.type === "required" && (
          <p className="error-message">
            Você deve aceitar os termos de privacidade
          </p>
        )}
      </div>

      <div className="form-group">
        {/* 
          A função que deve ser executada ao enviar 
          o formulario deve estar dentro do handleSubmit 
          retorna uma função** e ela é executada
        */}
        <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
      </div>
    </div>
  );
};

export default GoodForm;
