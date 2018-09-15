<?php
class Cache {
   private static function getRootDir() {
      return dirname(__DIR__);
   }

   public static function insert($key, $val) {
      $val = var_export($val, true);
      
      // HHVM fails at __set_state, so just use object cast for now
      $val = str_replace('stdClass::__set_state', '(object)', $val);
      
      // Write to temp file first to ensure atomicity
      $cache = self::getRootDir()."/cache/$key." . uniqid('', true) . '.cache';

      // Using LOCK_EX flag to prevent concurrent writes
      file_put_contents($cache, '<?php $val = ' . $val . ';', LOCK_EX);
      rename($cache, self::getRootDir()."/cache/$key");
   }

   public static function get($key) {
      @include self::getRootDir() . "/cache/$key";
      return isset($val) ? $val : false;
   }

   public static function remove($key) {
      @unlink(self::getRootDir()."/cache/$key");
   }
}