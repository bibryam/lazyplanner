/*******************************************************************************
Copyright (C) Bilgin Ibryam http://www.ofbizian.com

This is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 2.1 of the License, or
(at your option) any later version.

Foobar is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this software.  If not, see http://www.fsf.org
********************************************************************************/
package com.lp.util;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import javolution.util.FastList;
import org.ofbiz.base.util.UtilValidate;
import org.ofbiz.entity.GenericValue;

public class CommonHelper {

    public static List<GenericValue> filterByDataType(List<GenericValue> userPreferences, String dataType) {
        if (UtilValidate.isNotEmpty(dataType) && UtilValidate.isNotEmpty(userPreferences)) {
            List<GenericValue> filteredPrefs = FastList.newInstance();
            for(GenericValue userPreference : userPreferences) {
                if (dataType.equals(userPreference.getString("workEffortId"))) {
                    filteredPrefs.add(userPreference);
                }
            }
            return filteredPrefs;
        }
        return Collections.emptyList();
    }

    public static String getBacklogId(List<GenericValue> workEfforts) {
        if (UtilValidate.isNotEmpty(workEfforts)) {
            for(GenericValue workEffort : workEfforts) {      
                if ("BACKLOG".equals(workEffort.getString("workEffortPurposeTypeId"))) {
                    return workEffort.getString("workEffortId");
                }
            }
        }
        return "";
    }

    public static List<String> StringToList(String...  values) {
        return Arrays.asList(values);
    }
}
