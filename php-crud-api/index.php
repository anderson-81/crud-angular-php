<?php

require './classes/cadastro.php';

ignore_user_abort(true);
error_reporting(0);
session_start();

if (isset($_SESSION['login'])) {
    $post = json_decode(file_get_contents("php://input"));
    $opcao = htmlspecialchars(addslashes(trim($post->opcao)));
    $hash = htmlspecialchars(addslashes(trim($post->token)));
	
	if (isset($opcao)) {
		
        if ($opcao == 1) {
            if ($_SESSION['_token'] == $hash) {
				if (($post->nome != "") && ($post->email != "") && ($post->renda != "") && ($post->dataNasc != "") && ($post->sexo != "")) {
					DestruirToken();
					$nome = htmlspecialchars(addslashes(trim($post->nome)));
                    $email = htmlspecialchars(addslashes(trim($post->email)));
                    $renda = htmlspecialchars(addslashes(trim($post->renda)));
                    $dataNasc = htmlspecialchars(addslashes(trim($post->dataNasc)));
                    $sexo = htmlspecialchars(addslashes(trim($post->sexo)));
					echo json_encode(Cadastro::Incluir_PessoFisica($nome, $email, $renda, $dataNasc, $sexo));
				} else {
					DestruirToken();
				    echo json_encode(-1);
				}
			} else {
				DestruirToken();
				echo json_encode(0);
			}
		}

        if ($opcao == 2) {
            if ($_SESSION['_token'] == $hash) {
				if (($post->codigo != "") && ($post->nome != "") && ($post->email != "") && ($post->renda != "") && ($post->dataNasc != "") && ($post->sexo != "")) {
                    DestruirToken();
					$codigo = htmlspecialchars(addslashes(trim($post->codigo)));
                    $nome = htmlspecialchars(addslashes(trim($post->nome)));
                    $email = htmlspecialchars(addslashes(trim($post->email)));
                    $renda = htmlspecialchars(addslashes(trim($post->renda)));
                    $dataNasc = htmlspecialchars(addslashes(trim($post->dataNasc)));
                    $sexo = htmlspecialchars(addslashes(trim($post->sexo)));
					echo json_encode(Cadastro::Editar_PessoFisica($codigo, $nome, $email, $renda, $dataNasc, $sexo));
                } else {
					DestruirToken();
                    echo json_encode(-1);
                }
			} else {
				DestruirToken();
                echo json_encode(0);
            }
        }

        if ($opcao == 3) {
            if ($_SESSION['_token'] == $hash) {
                if ($post->codigo != "") {
                    $codigo = htmlspecialchars(addslashes(trim($post->codigo)));
					DestruirToken();
                    echo Cadastro::Excluir_PessoFisica($codigo);
                } else {
                    DestruirToken();
                    echo json_encode(-1);
                }
            } else {
				DestruirToken();
                echo json_encode(0);
            }
        }

        if ($opcao == 4) {
            if ($_SESSION['_token'] == $hash) {
                $dado = htmlspecialchars(addslashes(trim($post->dado)));
				DestruirToken();
                echo json_encode(Cadastro::Buscar_PessoaFisicaPorNome($dado));
            } else {
                echo json_encode(-1);
            }
        }

        if ($opcao == 5) {
            if ($_SESSION['_token'] == $hash) {
                $dado = htmlspecialchars(addslashes(trim($post->dado)));
		        echo json_encode(Cadastro::Buscar_PessoaFisicaPorCodigo($dado));
			} else {
			   DestruirToken();
               echo json_encode(-1);
            }
        }

        if ($opcao == 7) {
            echo VerificarSessao();
        }

        if ($opcao == 8) {
            session_destroy();
            echo json_encode("Session successfully closed.");
        }

        // Token generate.
        if ($opcao == 9) {
            echo Token();
        }
    }
} else {
    $post = json_decode(file_get_contents("php://input"));
    $opcao = htmlspecialchars(addslashes(trim($post->opcao)));
    if ($opcao == 6) {
        $hash = htmlspecialchars(addslashes(trim($post->token)));
        if ($_SESSION['_token'] == $hash) {
            DestruirToken();
            $login = htmlspecialchars(addslashes(trim($post->login)));
            $senha = htmlspecialchars(addslashes(trim($post->senha)));
            if (($login != "") && ($senha  != "")) {
                echo json_encode(Cadastro::Efetuar_Login($login, $senha));
            } else {
                echo json_encode("There Required Fields for login empty.");
            }
        } else {
			DestruirToken();
            echo json_encode(-1);
        }
    }

    if ($opcao == 7) {
        echo VerificarSessao();
    }
    
    // Token generate.
    if ($opcao == 9) {
        echo Token();
    }
}

function VerificarSessao() {
    if (isset($_SESSION['login'])) {
        return json_encode(1);
    } else {
        return json_encode(0);
    }
}

function DestruirToken(){
	unset($_SESSION['_token']);
}

function Token(){
    session_start();
    $_SESSION['_token'] = hash('sha512', rand(100, 10000));
    echo json_encode($_SESSION['_token']);  
}

?>