<?php

require_once 'conexao.php';
require_once 'pessoafisica.php';
require_once 'usuario.php';

class Controle {

    private $pf;
    private $conn;
    private $usu;

    public function __construct($pf) {
        $this->pf = $pf;
        $this->conn = Conexao::Conectar();
    }

    public function setUsuario($usu) {
        $this->usu = $usu;
    }

    private function GerarCodigoInclusao() {
        try {
            $stmt = $this->conn->prepare("SELECT MAX(CODIGO) + 1 AS CODIGO_INCLUSAO FROM PESSOA");
            $stmt->execute();
            $codigo = $stmt->fetchColumn();
            if ($codigo == NULL) {
                return 1;
            }

            return $codigo;
        } catch (Exception $ex) {
            return -1;
        }
    }

    private function StartTransaction() {
        try {
            $this->conn->beginTransaction();
            return 1;
        } catch (Exception $ex) {
            return -1;
        }
    }

    private function Commit() {
        try {
            $this->conn->commit();
            return 1;
        } catch (Exception $ex) {
            return -1;
        }
    }

    private function Rollback() {
        try {
            $this->conn->rollBack();
            return 1;
        } catch (Exception $ex) {
            return -1;
        }
    }

    /*     * ********************************************************************* */

    private function IncluirPessoa($codigo, $nome, $email) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO PESSOA VALUES (:codigo, :nome, :email)");
            $stmt->bindParam(':codigo', $codigo, PDO::PARAM_INT);
            $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->execute();
            $stmt = NULL;
            return 1;
        } catch (Exception $ex) {
            return -1;
        }
    }

    private function IncluirPessoaFisica() {
        try {
            $stmt = $this->conn->prepare("INSERT INTO PESSOAFISICA VALUES (:codigo, :codigo, :renda, :dataNasc, :sexo)");
            $stmt->bindParam(':codigo', $this->pf->getCodigo(), PDO::PARAM_INT);
            $stmt->bindParam(':codigo', $this->pf->getCodigo(), PDO::PARAM_INT);
            $stmt->bindParam(':renda', $this->pf->getRenda(), PDO::PARAM_STR);
            $stmt->bindParam(':dataNasc', $this->pf->getDataNasc(), PDO::PARAM_STR);
            $stmt->bindParam(':sexo', $this->pf->getSexo(), PDO::PARAM_STR);
            $stmt->execute();
            $stmt = NULL;
            return 1;
        } catch (Exception $ex) {
            return -1;
        }
    }

    public function Incluir_PessoFisica() {
        $this->pf->setCodigo($this->GerarCodigoInclusao());
        if ($this->pf->getCodigo() > 0) {
            if ($this->StartTransaction() == 1) {
                if ($this->IncluirPessoa($this->pf->getCodigo(), $this->pf->getNome(), $this->pf->getEmail()) == 1) {
                    if ($this->IncluirPessoaFisica() == 1) {
                        $this->Commit();
                        $this->conn = NULL;
                        return 1;
                    } else {
                        $this->Rollback();
                        $this->conn = NULL;
                        return -1;
                    }
                } else {
                    $this->Rollback();
                    $this->conn = NULL;
                    return -1;
                }
            } else {
                $this->conn = NULL;
                return -1;
            }
        } else {
            $this->conn = NULL;
            return -1;
        }
    }

    private function EditarPessoa($codigo, $nome, $email) {
        try {
            $sql = "UPDATE PESSOA SET NOME = '$nome', EMAIL = '$email' WHERE CODIGO = $codigo";
            $this->conn->exec($sql);
            return 1;
        } catch (Exception $ex) {
            return -1;
        }
    }

    private function EditarPessoaFisica() {
        try {
            $codigo = $this->pf->getCodigo();
            $renda = $this->pf->getRenda();
            $dataNasc = $this->pf->getDataNasc();
            $sexo = $this->pf->getSexo();

            $sql = "UPDATE PESSOAFISICA SET RENDA = $renda, DATANASC = '$dataNasc', SEXO = '$sexo' WHERE CODIGO = $codigo";
            $this->conn->exec($sql);
            return 1;
        } catch (Exception $ex) {
            return -1;
        }
    }

    public function Editar_PessoFisica() {
        if ($this->StartTransaction() == 1) {
            if ($this->EditarPessoa($this->pf->getCodigo(), $this->pf->getNome(), $this->pf->getEmail()) == 1) {
                if ($this->EditarPessoaFisica() == 1) {
                    $this->Commit();
                    $this->conn = NULL;
                    return 1;
                } else {
                    $this->Rollback();
                    $this->conn = NULL;
                    return -1;
                }
            } else {
                $this->Rollback();
                $this->conn = NULL;
                return -1;
            }
        } else {
            $this->conn = NULL;
            return -1;
        }
    }

    private function ExcluirPessoa($codigo) {
        try {
            $sql = "DELETE FROM PESSOA WHERE CODIGO = $codigo";
            $this->conn->exec($sql);
            return 1;
        } catch (Exception $ex) {
            return -1;
        }
    }

    private function ExcluirPessoaFisica() {
        try {
            $codigo = $this->pf->getCodigo();

            $sql = "DELETE FROM PESSOAFISICA WHERE CODIGO = $codigo";
            $this->conn->exec($sql);
            return 1;
        } catch (Exception $ex) {
            return -1;
        }
    }

    public function Excluir_PessoFisica() {
        if ($this->StartTransaction() == 1) {
            if ($this->ExcluirPessoaFisica() == 1) {
                if ($this->ExcluirPessoa($this->pf->getCodigo()) == 1) {
                    $this->Commit();
                    $this->conn = NULL;
                    return 1;
                } else {
                    $this->Rollback();
                    $this->conn = NULL;
                    return -1;
                }
            } else {
                $this->Rollback();
                $this->conn = NULL;
                return -1;
            }
        } else {
            $this->conn = NULL;
            return -1;
        }
    }

    public function Buscar_PessoaFisicaPorNome() {
        try {
            $nome = $this->pf->getNome() . '%';
            $stmt = $this->conn->prepare("SELECT *, strftime('%Y-%m-%d',DATANASC) as DATANASCIMENTO FROM PESSOA INNER JOIN PESSOAFISICA ON PESSOA.CODIGO = PESSOAFISICA.PESSOA_CODIGO WHERE PESSOA.NOME LIKE :nome");
            $stmt->bindValue(":nome", $nome);
            $stmt->execute();
            $resultado = $stmt->fetchAll();
            $this->conn = NULL;
            return $resultado;
        } catch (Exception $exc) {
            return NULL;
        }
    }

    public function Buscar_PessoaFisicaPorCodigo() {
        try {
            $codigo = $this->pf->getCodigo();
            $stmt = $this->conn->prepare("SELECT *, strftime('%Y-%m-%d',DATANASC) as DATANASCIMENTO FROM PESSOA INNER JOIN PESSOAFISICA ON PESSOA.CODIGO = PESSOAFISICA.PESSOA_CODIGO WHERE PESSOA.CODIGO = :codigo");
            $stmt->bindValue(":codigo", $codigo);
            $stmt->execute();
            $resultado = $stmt->fetchAll();
            $this->conn = NULL;
            return $resultado;
        } catch (Exception $exc) {
            return NULL;
        }
    }

    public function Efetuar_Login() {
        try {
            $login = addslashes($this->usu->getLogin());
            $senha = addslashes(md5($this->usu->getSenha()));
            $sql = "select login from usuario where login = '$login' and senha = '$senha'";
            $resultado = $this->conn->query($sql);
            if ($resultado) {
                foreach ($resultado as $linha) {
                    $login_r = $linha[0];
                }
                
                if ($login == $login_r) {
                    $this->conn = NULL;
                    $num = hash('sha512',rand(100000, 900000));
                    session_start();
                    $_SESSION["numLogin"] = $num;
                    $_SESSION["login"] = $this->usu->getLogin();
                    return 1;
                }
                return 0;
            } else {
                $this->conn = NULL;
                return 0;
            }
        } catch (Exception $exc) {
            return -1;
        }
    }

}

?>
