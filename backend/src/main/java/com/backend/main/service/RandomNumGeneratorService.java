package com.backend.main.service;

import java.util.Random;

public class RandomNumGeneratorService {
   static String[] numList = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};

   public static String generateID(int length){
       String code = "";
       for (int x = 0; x<length; x++){
           code += numList[new Random().nextInt(numList.length)];
       }
       return code;
   }
}
