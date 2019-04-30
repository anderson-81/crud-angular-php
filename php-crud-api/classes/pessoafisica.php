<?php

require_once 'pessoa.php';

class PessoaFisica implements Pessoa {

    private $codigo;
    private $nome;
    private $email;
    private $renda;
    private $dataNasc;
    private $sexo;

    public function getCodigo() {
        return $this->codigo;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setCodigo($codigo) {
        $this->codigo = $codigo;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setNome($nome) {
        $this->nome = $nome;
    }

    /*     * ****** */

    public function getRenda() {
        return $this->renda;
    }

    public function setRenda($renda) {
        $this->renda = $renda;
    }

    public function getDataNasc() {
        return $this->dataNasc;
    }

    public function setDataNasc($dataNasc) {
        $this->dataNasc = $dataNasc;
    }

    public function getSexo() {
        return $this->sexo;
    }

    public function setSexo($sexo) {
        $this->sexo = $sexo;
    }

}

?>