<?php

// For debugging - Allows Console logging from php
if (!function_exists('logConsole')) {
 function logConsole($name, $data = NULL, $jsEval = FALSE) {
      if (! $name) return false;
      $isevaled = false;
      $type = ($data || gettype($data)) ? 'Type: ' . gettype($data) : '';
      if ($jsEval && (is_array($data) || is_object($data))) {
           $data = 'eval(' . preg_replace('#[\s\r\n\t\0\x0B]+#', '', json_encode($data)) . ')';
           $isevaled = true;
      } else {
           $data = json_encode($data);
      }
      # sanitalize
      $data = $data ? $data : '';
      $search_array = array("#'#", '#""#', "#''#", "#\n#", "#\r\n#");
      $replace_array = array('"', '', '', '\\n', '\\n');
      $data = preg_replace($search_array,  $replace_array, $data);
      $data = ltrim(rtrim($data, '"'), '"');
      //$data = $isevaled ? $data : ($data[0] === "'") ? $data : "'" . $data . "'";
$log = $name .' : '. $data .' : '. $type;	 
	 
$js = <<<JSCODE
\n<script>
 // fallback - to deal with IE (or browsers that don't have console)
 if (! window.console) console = {};
 console.log = console.log || function(name, data){};
 console.log('$log');
 //console.log('\\n');
</script>
JSCODE;
      echo $js;
 } # end logConsole
}

// Generate Secure Password
function generateHashWithSalt($password) {
	define("MAX_LENGTH", 25);
    $intermediateSalt = md5(uniqid(rand(), true));
    $salt = substr($intermediateSalt, 0, MAX_LENGTH);
   	$pw = hash("sha256", $password . $salt);
	$secPW = array('salt'=>$salt,'pw'=>$pw);
	return $secPW;
}