<?php

class Conexao {

    public static function Conectar() {
        try {
            $conexao = new PDO('sqlite:db.sqlite');
            $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conexao;
        } catch (Exception $ex) {
            return NULL;
        }
    }

}

?>