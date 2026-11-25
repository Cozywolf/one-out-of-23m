// Auto-generated from 13 data/tw_*.json files by sync_data.py
window.TW_DATA = {
  "regions": {
    "meta": {
      "schema_version": "1.0.0",
      "scope": "Taiwan 6 Macro-Regions (MVP)",
      "baseline_year": 2025,
      "national_baselines": {
        "life_expectancy_2025": 81.27,
        "life_expectancy_2024": 80.77,
        "life_expectancy_male_2025": 77.93,
        "life_expectancy_female_2025": 84.75,
        "household_disposable_income_avg_twd_2024": 1165000,
        "household_disposable_income_median_twd_2025": 976700,
        "house_price_to_income_ratio_2026q1": 9.47,
        "house_price_to_income_ratio_peak_2024q3": 10.82,
        "median_house_price_twd_2025q1": 10000000
      },
      "sources": [
        "內政部 2025 年（114 年）底人口統計與簡易生命表",
        "內政部 2024 年簡易生命表（台北市 83.40 歲最高、台東縣 75.97 歲最低）",
        "主計總處 2024 年（113 年）家庭收支調查",
        "內政部不動產資訊平台 2025 Q1–2026 Q1 房價負擔能力統計",
        "104 玩數據百萬畢業生跨區就業與北漂返鄉調查"
      ]
    },
    "regions": [
      {
        "id": "north_taipei",
        "name_zh": "雙北基",
        "name_en": "Greater Taipei & Keelung",
        "counties": [
          "台北市",
          "新北市",
          "基隆市"
        ],
        "population_share_2025": 0.293,
        "birth_weight_estimate": 0.285,
        "urbanization": "metropolitan",
        "life_expectancy": {
          "regional_avg": 82.3,
          "offset_from_national": 1.0,
          "notable_counties": {
            "台北市": 83.98,
            "新北市": 81.54
          }
        },
        "income_multiplier": 1.15,
        "notable_household_income_twd": {
          "台北市": 1485000
        },
        "house_price_to_income_ratio": {
          "regional_avg": 13.0,
          "by_county": {
            "台北市": 14.72,
            "新北市": 12.63,
            "基隆市": 5.7
          },
          "historical_note_2025q1": {
            "台北市": 15.57,
            "新北市": 13.17
          }
        },
        "sector_weights": {
          "agriculture": 0.01,
          "industry_tech": 0.22,
          "services": 0.77
        },
        "key_industries": [
          "金融保險",
          "資訊軟體",
          "媒體文創",
          "公教行政",
          "商業服務"
        ],
        "flavor_tags": {
          "commute": [
            "捷運（1996年木柵線通車後成型）",
            "公車",
            "雙北跨橋機車潮"
          ],
          "housing": [
            "高房租",
            "頂樓加蓋／分租雅房",
            "老公寓無電梯",
            "蛋白區重劃大樓"
          ],
          "climate": [
            "冬季濕冷多雨",
            "盆地夏季悶熱"
          ],
          "lifestyle": [
            "醫療與補教資源最密集",
            "步調緊湊",
            "居住成本易擠壓幸福感"
          ]
        },
        "out_migration_rates": {
          "to_central": 0.061,
          "to_south": 0.043
        }
      },
      {
        "id": "north_hsinchu",
        "name_zh": "桃竹苗",
        "name_en": "Taoyuan, Hsinchu & Miaoli",
        "counties": [
          "桃園市",
          "新竹市",
          "新竹縣",
          "苗栗縣"
        ],
        "population_share_2025": 0.168,
        "birth_weight_estimate": 0.195,
        "urbanization": "tech_suburban",
        "life_expectancy": {
          "regional_avg": 81.3,
          "offset_from_national": 0.0,
          "notable_counties": {
            "新竹市": 82.13,
            "桃園市": 81.03
          }
        },
        "income_multiplier": 1.18,
        "notable_household_income_twd": {
          "新竹市": 1503000,
          "新竹縣": 1481000
        },
        "house_price_to_income_ratio": {
          "regional_avg": 8.5,
          "by_county": {
            "新竹縣": 9.21,
            "桃園市": 8.43,
            "新竹市": 8.43
          }
        },
        "sector_weights": {
          "agriculture": 0.02,
          "industry_tech": 0.46,
          "services": 0.52
        },
        "key_industries": [
          "半導體",
          "IC設計",
          "電子代工",
          "航空物流"
        ],
        "flavor_tags": {
          "commute": [
            "園區上下班塞車",
            "機捷／高鐵跨區通勤",
            "汽機車代步"
          ],
          "housing": [
            "竹北／青埔重劃區",
            "明星學區總量管制擠破頭"
          ],
          "climate": [
            "新竹九降風強勁"
          ],
          "lifestyle": [
            "全台幼年人口比與出生率最高",
            "高薪高工時工程師文化",
            "桃園多元移工與航空城",
            "苗栗客庄聚落"
          ]
        },
        "out_migration_rates": {
          "to_central": 0.061,
          "to_south": 0.043
        }
      },
      {
        "id": "central",
        "name_zh": "中彰投",
        "name_en": "Taichung, Changhua & Nantou",
        "counties": [
          "台中市",
          "彰化縣",
          "南投縣"
        ],
        "population_share_2025": 0.196,
        "birth_weight_estimate": 0.205,
        "urbanization": "mixed_industrial",
        "life_expectancy": {
          "regional_avg": 80.7,
          "offset_from_national": -0.5,
          "notable_counties": {
            "台中市": 81.05
          }
        },
        "income_multiplier": 0.98,
        "notable_household_income_twd": {
          "台中市": 1172000
        },
        "house_price_to_income_ratio": {
          "regional_avg": 10.2,
          "by_county": {
            "台中市": 11.35,
            "南投縣": 8.47,
            "彰化縣": 8.23
          }
        },
        "sector_weights": {
          "agriculture": 0.06,
          "industry_tech": 0.41,
          "services": 0.53
        },
        "key_industries": [
          "精密機械",
          "金屬機電傳產",
          "中小企業製造",
          "中部科學園區"
        ],
        "flavor_tags": {
          "commute": [
            "汽機車為主",
            "中捷綠線"
          ],
          "housing": [
            "傳統透天厝與新興重劃區大樓並存"
          ],
          "climate": [
            "氣候晴朗宜人",
            "冬季中南部空品PM2.5微調風險"
          ],
          "lifestyle": [
            "黑手變頭家與家族工廠文化",
            "易受2000年代西進與2025關稅衝擊",
            "南投為1999年921震央核心"
          ]
        },
        "out_migration_rates": {
          "to_north": 0.277
        }
      },
      {
        "id": "south_tainan",
        "name_zh": "雲嘉南",
        "name_en": "Yunlin, Chiayi & Tainan",
        "counties": [
          "雲林縣",
          "嘉義市",
          "嘉義縣",
          "台南市"
        ],
        "population_share_2025": 0.14,
        "birth_weight_estimate": 0.13,
        "urbanization": "agro_tech_mix",
        "life_expectancy": {
          "regional_avg": 79.8,
          "offset_from_national": -1.4,
          "notable_counties": {
            "台南市": 80.29
          }
        },
        "income_multiplier": 0.88,
        "notable_household_income_twd": {
          "嘉義市": 1213000
        },
        "house_price_to_income_ratio": {
          "regional_avg": 8.0,
          "by_county": {
            "台南市": 8.76,
            "嘉義市": 7.51,
            "雲林縣": 7.17,
            "嘉義縣": 6.67
          }
        },
        "sector_weights": {
          "agriculture": 0.12,
          "industry_tech": 0.34,
          "services": 0.54
        },
        "key_industries": [
          "農業畜牧",
          "南部科學園區",
          "傳統製造加工",
          "在地觀光餐飲"
        ],
        "flavor_tags": {
          "commute": [
            "高度依賴機車"
          ],
          "housing": [
            "南科擴張推升善化／新市房價形成世代落差",
            "鄉鎮老屋透天"
          ],
          "climate": [
            "日照充足",
            "夏季高溫午後雷陣雨"
          ],
          "lifestyle": [
            "農業與高齡化並存（嘉義縣65+占比全台最高）",
            "2002年WTO衝擊農家",
            "濃厚宗族廟會與飲食文化"
          ]
        },
        "out_migration_rates": {
          "to_north": 0.23
        }
      },
      {
        "id": "south_kaohsiung",
        "name_zh": "高屏",
        "name_en": "Kaohsiung & Pingtung",
        "counties": [
          "高雄市",
          "屏東縣"
        ],
        "population_share_2025": 0.15,
        "birth_weight_estimate": 0.138,
        "urbanization": "industrial_port",
        "life_expectancy": {
          "regional_avg": 79.3,
          "offset_from_national": -1.9,
          "notable_counties": {
            "高雄市": 79.8,
            "屏東縣": 77.79
          }
        },
        "income_multiplier": 0.92,
        "notable_household_income_twd": {},
        "house_price_to_income_ratio": {
          "regional_avg": 8.8,
          "by_county": {
            "高雄市": 9.35,
            "屏東縣": 7.08
          }
        },
        "sector_weights": {
          "agriculture": 0.07,
          "industry_tech": 0.35,
          "services": 0.58
        },
        "key_industries": [
          "鋼鐵石化",
          "造船海運",
          "半導體設廠轉型",
          "觀光展演"
        ],
        "flavor_tags": {
          "commute": [
            "機車為主",
            "高雄捷運與輕軌"
          ],
          "housing": [
            "舊市區公寓與北高雄科技廊帶新屋"
          ],
          "climate": [
            "夏季酷熱",
            "颱風登陸首當其衝（如2009莫拉克）"
          ],
          "lifestyle": [
            "1980–90年代重工業火車頭",
            "2000年代產業轉型低潮",
            "近年台積電進駐與演唱會經濟回溫",
            "屏東偏鄉就醫距離較遠"
          ]
        },
        "out_migration_rates": {
          "to_north": 0.23
        }
      },
      {
        "id": "east_islands",
        "name_zh": "宜花東與離島",
        "name_en": "Yilan, Hualien, Taitung & Offshore Islands",
        "counties": [
          "宜蘭縣",
          "花蓮縣",
          "台東縣",
          "澎湖縣",
          "金門縣",
          "連江縣"
        ],
        "population_share_2025": 0.053,
        "birth_weight_estimate": 0.047,
        "urbanization": "rural_coastal",
        "life_expectancy": {
          "regional_avg": 78.2,
          "offset_from_national": -3.1,
          "notable_counties": {
            "花蓮縣": 77.09,
            "台東縣": 76.49,
            "台東男性": 72.3
          }
        },
        "income_multiplier": 0.82,
        "notable_household_income_twd": {},
        "house_price_to_income_ratio": {
          "regional_avg": 7.9,
          "by_county": {
            "金門縣": 8.38,
            "花蓮縣": 8.31,
            "台東縣": 8.15,
            "宜蘭縣": 7.33
          }
        },
        "sector_weights": {
          "agriculture": 0.14,
          "industry_tech": 0.2,
          "services": 0.66
        },
        "key_industries": [
          "觀光旅宿",
          "農漁林業",
          "軍公教"
        ],
        "flavor_tags": {
          "commute": [
            "台鐵花東線搶票",
            "蘇花公路／蘇花改",
            "宜蘭2006年雪隧通車納入台北圈",
            "離島船機交通"
          ],
          "housing": [
            "透天農舍與民宿經濟"
          ],
          "climate": [
            "颱風登陸與豪雨土石流高風險",
            "地震帶高風險"
          ],
          "lifestyle": [
            "原住民族文化多元",
            "離島就醫後送與觀光淡旺季",
            "金門地方福利特殊",
            "男性平均壽命與全台落差最大"
          ]
        },
        "out_migration_rates": {
          "to_west_metro": 0.45
        }
      }
    ],
    "migration_dynamics": {
      "key_ages": [
        18,
        22,
        25
      ],
      "midlife_return_dilemma": {
        "age_range": [
          30,
          45
        ],
        "want_to_return_ratio": 0.686,
        "top_reasons_to_return": {
          "care_for_family": 0.491,
          "weather": 0.474
        },
        "high_struggle_ratio": 0.714,
        "top_barriers": {
          "fear_no_job": 0.683,
          "fear_pay_cut": 0.676
        },
        "pay_cut_multiplier_on_return": 0.8
      }
    },
    "income_quintiles": {
      "baseline_year": 2024,
      "top_vs_bottom_ratio": 6.14,
      "q5_avg_disposable_income_twd": 2357000,
      "q1_avg_disposable_income_twd": 384000,
      "tiers": [
        {
          "quintile": 1,
          "label": "最底層 20%",
          "share": 0.2,
          "resource_multiplier": 0.33,
          "youth_effects": "較高機率就讀高職／半工半讀、需辦學貸、初始知識值偏低",
          "adult_effects": "買房完全靠自己、對失業與重大醫療支出耐受度低"
        },
        {
          "quintile": 2,
          "label": "中下層 20%",
          "share": 0.2,
          "resource_multiplier": 0.65,
          "youth_effects": "多就讀公私立大學、部分需辦學貸",
          "adult_effects": "頭期款累積期長，常選擇蛋白區或租屋"
        },
        {
          "quintile": 3,
          "label": "中產基準 20%",
          "share": 0.2,
          "resource_multiplier": 0.95,
          "youth_effects": "一般補習、正常升學路徑",
          "adult_effects": "家庭可能小額贊助婚嫁或購屋頭期款"
        },
        {
          "quintile": 4,
          "label": "中上層 20%",
          "share": 0.2,
          "resource_multiplier": 1.35,
          "youth_effects": "教育資源充足、較高機率進頂大或攻讀研究所",
          "adult_effects": "父母可協助部分頭期款、較早接觸股市或ETF投資"
        },
        {
          "quintile": 5,
          "label": "頂層 20%",
          "share": 0.2,
          "resource_multiplier": 2.02,
          "youth_effects": "高機率進頂大、解鎖出國留學選項",
          "adult_effects": "較高機率繼承房產、免背40年房貸、人生容錯率極高"
        }
      ]
    }
  },
  "eras": {
    "meta": {
      "schema_version": "1.0.0",
      "coverage_years": [
        1950,
        2070
      ],
      "roc_year_formula": "roc_year = gregorian_year - 1911",
      "interpolation_note": "引擎逐年模擬時對 anchor_years 做線性內插，若遇 year_overrides 則優先以精確年度數據覆寫。",
      "sources": [
        "主計總處長期薪資、物價與失業率統計",
        "監察院、內政部戶政司與公視／中央社歷年出生數與生育率統計",
        "教育部大專校院與升學錄取率統計",
        "國發會 2024–2070 人口推估報告",
        "中央銀行、台銀定存利率與證交所／媒體整理台股紀錄",
        "104 人力銀行與 1111 人力銀行引用主計總處薪資分布調查"
      ]
    },
    "anchor_years": [
      {
        "year": 1950,
        "cpi_index_2025_base": 0.075,
        "avg_monthly_wage_twd": 420,
        "min_wage_twd": 200,
        "unemployment_rate": 0.045,
        "uni_admission_rate": 0.16,
        "tfr": 6.03,
        "deposit_rate_1yr": 0.24,
        "era_summary": "戰後重建初期、韓戰美援重啟、勞保開辦與農業為主的克難社會"
      },
      {
        "year": 1955,
        "cpi_index_2025_base": 0.1,
        "avg_monthly_wage_twd": 700,
        "min_wage_twd": 300,
        "unemployment_rate": 0.038,
        "uni_admission_rate": 0.2,
        "tfr": 6.5,
        "deposit_rate_1yr": 0.18,
        "era_summary": "農村社會、美援、高通膨與高生育（1956年首訂基本工資300元）"
      },
      {
        "year": 1960,
        "cpi_index_2025_base": 0.145,
        "avg_monthly_wage_twd": 980,
        "min_wage_twd": 300,
        "unemployment_rate": 0.036,
        "uni_admission_rate": 0.22,
        "tfr": 5.75,
        "deposit_rate_1yr": 0.17,
        "era_summary": "八七水災後重建、中橫通車、人口紅利起飛與輕工業萌芽"
      },
      {
        "year": 1965,
        "cpi_index_2025_base": 0.18,
        "avg_monthly_wage_twd": 1300,
        "min_wage_twd": 450,
        "unemployment_rate": 0.033,
        "uni_admission_rate": 0.25,
        "tfr": 4.8,
        "deposit_rate_1yr": 0.108,
        "era_summary": "加工出口區設立、客廳即工廠起步"
      },
      {
        "year": 1970,
        "cpi_index_2025_base": 0.23,
        "avg_monthly_wage_twd": 2250,
        "min_wage_twd": 600,
        "unemployment_rate": 0.017,
        "uni_admission_rate": 0.27,
        "tfr": 4.0,
        "deposit_rate_1yr": 0.097,
        "era_summary": "九年國教初上路、加工出口區熱潮、家庭工廠與外銷高速起飛"
      },
      {
        "year": 1975,
        "cpi_index_2025_base": 0.38,
        "avg_monthly_wage_twd": 4200,
        "min_wage_twd": 600,
        "unemployment_rate": 0.024,
        "uni_admission_rate": 0.28,
        "tfr": 2.8,
        "deposit_rate_1yr": 0.12,
        "era_summary": "十大建設、石油危機後經濟起飛"
      },
      {
        "year": 1980,
        "cpi_index_2025_base": 0.58,
        "avg_monthly_wage_twd": 8800,
        "min_wage_twd": 3300,
        "unemployment_rate": 0.012,
        "uni_admission_rate": 0.3,
        "tfr": 2.5,
        "deposit_rate_1yr": 0.125,
        "era_summary": "工業化衝刺、新竹科學園區成立"
      },
      {
        "year": 1985,
        "cpi_index_2025_base": 0.65,
        "avg_monthly_wage_twd": 13900,
        "min_wage_twd": 6150,
        "unemployment_rate": 0.029,
        "uni_admission_rate": 0.32,
        "tfr": 1.88,
        "deposit_rate_1yr": 0.072,
        "era_summary": "1984年生育率2.06首度低於2.1替換水準"
      },
      {
        "year": 1990,
        "cpi_index_2025_base": 0.72,
        "avg_monthly_wage_twd": 24300,
        "min_wage_twd": 9750,
        "unemployment_rate": 0.017,
        "uni_admission_rate": 0.38,
        "tfr": 1.81,
        "deposit_rate_1yr": 0.095,
        "era_summary": "股市萬二崩盤(-80%)、鴻源倒閉、房價翻倍後修正"
      },
      {
        "year": 1995,
        "cpi_index_2025_base": 0.82,
        "avg_monthly_wage_twd": 35400,
        "min_wage_twd": 14880,
        "unemployment_rate": 0.018,
        "uni_admission_rate": 0.45,
        "tfr": 1.78,
        "deposit_rate_1yr": 0.073,
        "era_summary": "全民健保開辦、410教改後大學擴張啟動"
      },
      {
        "year": 2000,
        "cpi_index_2025_base": 0.86,
        "avg_monthly_wage_twd": 41900,
        "min_wage_twd": 15840,
        "unemployment_rate": 0.03,
        "uni_admission_rate": 0.6,
        "tfr": 1.68,
        "deposit_rate_1yr": 0.05,
        "era_summary": "網路泡沫(-66.6%)、首次政黨輪替、廣設大學"
      },
      {
        "year": 2005,
        "cpi_index_2025_base": 0.87,
        "avg_monthly_wage_twd": 43200,
        "min_wage_twd": 15840,
        "unemployment_rate": 0.041,
        "uni_admission_rate": 0.89,
        "tfr": 1.12,
        "deposit_rate_1yr": 0.018,
        "era_summary": "雙卡風暴、勞退新制上路、實質薪資停滯期"
      },
      {
        "year": 2010,
        "cpi_index_2025_base": 0.9,
        "avg_monthly_wage_twd": 44400,
        "min_wage_twd": 17280,
        "unemployment_rate": 0.052,
        "uni_admission_rate": 0.95,
        "tfr": 0.9,
        "deposit_rate_1yr": 0.011,
        "era_summary": "金融海嘯餘波、22K低薪定錨（大學畢業平均起薪25,246元）"
      },
      {
        "year": 2015,
        "cpi_index_2025_base": 0.95,
        "avg_monthly_wage_twd": 48500,
        "min_wage_twd": 20008,
        "unemployment_rate": 0.038,
        "uni_admission_rate": 0.96,
        "tfr": 1.18,
        "deposit_rate_1yr": 0.013,
        "era_summary": "低利率、房價走高、少子化逼近大專校院"
      },
      {
        "year": 2020,
        "cpi_index_2025_base": 0.98,
        "avg_monthly_wage_twd": 54300,
        "min_wage_twd": 23800,
        "unemployment_rate": 0.039,
        "uni_admission_rate": 0.98,
        "tfr": 0.99,
        "deposit_rate_1yr": 0.0084,
        "era_summary": "COVID-19爆發、定存利率首度跌破1%、實質經常性薪資41,538元首超2003年"
      },
      {
        "year": 2025,
        "cpi_index_2025_base": 1.0,
        "avg_monthly_wage_twd": 62500,
        "min_wage_twd": 28590,
        "unemployment_rate": 0.0335,
        "uni_admission_rate": 0.975,
        "tfr": 0.695,
        "deposit_rate_1yr": 0.0173,
        "era_summary": "進入超高齡社會(65+占20.06%)、AI與資通訊占出口74%、經濟成長7.37%"
      },
      {
        "year": 2040,
        "cpi_index_2025_base": 1.25,
        "avg_monthly_wage_twd": 78000,
        "min_wage_twd": 36000,
        "unemployment_rate": 0.035,
        "uni_admission_rate": 0.98,
        "tfr": 0.9,
        "deposit_rate_1yr": 0.018,
        "era_summary": "推估：總人口跌破2,100萬、長照人力高度緊繃"
      },
      {
        "year": 2070,
        "cpi_index_2025_base": 1.9,
        "avg_monthly_wage_twd": 118000,
        "min_wage_twd": 54000,
        "unemployment_rate": 0.032,
        "uni_admission_rate": 0.98,
        "tfr": 1.0,
        "deposit_rate_1yr": 0.02,
        "era_summary": "國發會中推估：總人口1,497萬、65+占46.5%、年齡中位數62.4歲、青壯年與老人比1:1"
      }
    ],
    "year_overrides": {
      "1979": {
        "births": 422518
      },
      "1984": {
        "tfr": 2.06,
        "uni_students": 173000
      },
      "1986": {
        "industry_gdp_share": 0.4711,
        "manufacturing_gdp_share": 0.3935
      },
      "1989": {
        "services_gdp_share_above_50": true,
        "taipei_house_price_per_ping_peak_twd": 255000
      },
      "1990": {
        "stock_crash_pct": -0.8,
        "taiex_peak": 12682,
        "taiex_trough": 2485
      },
      "1994": {
        "uni_admission_rate": 0.44,
        "higher_ed_institutions": 130
      },
      "1997": {
        "stock_crash_pct": -0.397
      },
      "2000": {
        "stock_crash_pct": -0.666
      },
      "2001": {
        "manufacturing_gdp_share": 0.2889
      },
      "2002": {
        "uni_admission_rate": 0.83
      },
      "2003": {
        "tfr": 1.23,
        "etf_0050_launch": true
      },
      "2006": {
        "divorces": 64540,
        "crude_divorce_rate_per_1000": 2.83
      },
      "2007": {
        "uni_students": 1120000
      },
      "2008": {
        "tfr": 1.05,
        "stock_crash_pct": -0.577
      },
      "2009": {
        "unemployment_rate": 0.0585,
        "unemployment_peak_aug": 0.0613,
        "non_agri_wage_yoy": -0.0431,
        "intern_22k_scheme": true
      },
      "2010": {
        "grad_avg_starting_salary_twd": 25246,
        "grad_3yr_salary_twd": 33151
      },
      "2011": {
        "higher_ed_institutions": 163,
        "stock_crash_pct": -0.283
      },
      "2012": {
        "uni_students": 1355000,
        "overseas_workers_china_peak": 430000
      },
      "2016": {
        "births": 208440,
        "min_wage_twd": 20008
      },
      "2019": {
        "uni_admission_rate": 1.0
      },
      "2020": {
        "deposit_rate_1yr": 0.0084,
        "stock_crash_pct": -0.3,
        "real_regular_wage_twd": 41538
      },
      "2021": {
        "unemployment_rate": 0.0395,
        "unpaid_leave_peak": 31980,
        "last_ast_admission_rate": 0.9798,
        "natural_pop_growth_negative_since_feb": true
      },
      "2022": {
        "life_expectancy_drop_covid": -1.02,
        "uni_shortfall_seats": 14493,
        "overseas_workers_china": 177000
      },
      "2023": {
        "higher_ed_institutions": 145,
        "uni_students": 1095000
      },
      "2024": {
        "tfr": 0.885,
        "first_marriage_age_male": 33.1,
        "first_marriage_age_female": 31.1,
        "first_birth_mother_age": 31.7,
        "overseas_workers_total": 666000,
        "overseas_workers_us": 137000,
        "overseas_workers_china": 231000,
        "house_price_to_income_peak_q3": 10.82
      },
      "2025": {
        "births": 107812,
        "tfr": 0.695,
        "marriages": 104376,
        "crude_marriage_rate_per_1000": 4.47,
        "divorces": 52101,
        "crude_divorce_rate_per_1000": 2.23,
        "elderly_65_plus_share": 0.2006,
        "gdp_growth": 0.0737,
        "ict_semiconductor_export_share": 0.74,
        "services_employment_share": 0.6101,
        "unemployment_rate": 0.0335,
        "unpaid_leave_oct_tariff": 8543,
        "scam_cases": 162000,
        "scam_loss_twd_billion": 90.0,
        "stock_crash_pct_dip": -0.18
      },
      "2026": {
        "min_wage_twd": 29500,
        "min_hourly_wage_twd": 196,
        "birth_subsidy_per_child_twd": 100000,
        "deposit_rate_1yr_range": [
          0.01725,
          0.0176
        ],
        "uni_admission_rate": 0.9754,
        "taiex_intraday_high_oct": 49968.92,
        "tsmc_share_price_oct_twd": 2590,
        "etf_0050_holders_jul": 3563000
      },
      "1953": {
        "note": "實施耕者有其田，農村自耕農比例大增"
      },
      "1958": {
        "note": "八二三砲戰爆發，台海進入長期軍事對峙"
      },
      "1959": {
        "note": "八七水災重創中南部，農工產值受損"
      },
      "1966": {
        "note": "高雄加工出口區成立，女工外銷經濟起飛"
      },
      "1968": {
        "note": "實施九年國民義務教育，國中就學率躍升"
      },
      "1971": {
        "note": "退出聯合國，引發外交與移民焦慮"
      },
      "1973": {
        "note": "第一次石油危機爆發，國際油價暴漲"
      },
      "1974": {
        "stock_crash_pct": -0.57,
        "cpi_inflation_pct": 0.475,
        "note": "石油危機衝擊，台灣 CPI 暴漲 47.5%、台股重挫"
      },
      "1978": {
        "note": "中山高速公路全線通車，年底美國宣布斷交"
      }
    },
    "institutional_switches": [
      {
        "id": "labor_insurance_1950",
        "start_year": 1950,
        "category": "welfare",
        "name": "勞工保險開辦",
        "effect": "台灣最早的社會保險制度，保障受僱勞工傷病與老年給付"
      },
      {
        "id": "land_to_tiller_1953",
        "start_year": 1953,
        "category": "economy",
        "name": "耕者有其田條例",
        "effect": "農村自耕農大幅增加，改善農戶所得與子女升學條件"
      },
      {
        "id": "joint_uni_exam_1954",
        "start_year": 1954,
        "category": "education",
        "name": "大專聯考制度開辦",
        "effect": "匿名統一閱卷，確立長達 48 年的聯考窄門時代"
      },
      {
        "id": "min_wage_1956",
        "start_year": 1956,
        "category": "labor",
        "name": "首訂基本工資（300元）",
        "effect": "台灣首度建立法定最低工資基準"
      },
      {
        "id": "twse_launch_1962",
        "start_year": 1962,
        "category": "finance",
        "name": "臺灣證券交易所開業",
        "effect": "開啟台灣集中股市與公開資本市場時代"
      },
      {
        "id": "kaohsiung_epz_1966",
        "start_year": 1966,
        "category": "economy",
        "name": "高雄加工出口區成立",
        "effect": "全球首座加工出口區，帶動外銷工業與女性就業潮"
      },
      {
        "id": "compulsory_9yr_ed",
        "start_year": 1968,
        "birth_cohort_start": 1956,
        "category": "education",
        "name": "九年國民義務教育",
        "effect": "免考初中聯考，國中就學率躍升近100%"
      },
      {
        "id": "ten_major_projects_1974",
        "start_year": 1974,
        "category": "economy",
        "name": "十大建設啟動",
        "effect": "高速公路、鐵路電氣化與重工業奠定現代經濟骨幹"
      },
      {
        "id": "abolish_self_study_exam_1976",
        "start_year": 1976,
        "category": "education",
        "name": "廢除自費留學考試",
        "effect": "大幅降低自費出國門檻，引爆赴美留學熱潮"
      },
      {
        "id": "outbound_tourism",
        "start_year": 1979,
        "category": "civil_liberty",
        "name": "開放國人出國觀光",
        "effect": "解鎖一般民眾出國旅遊選項"
      },
      {
        "id": "lift_martial_law",
        "start_year": 1987,
        "category": "civil_liberty",
        "name": "解除戒嚴（7/15）與開放大陸探親（11月）",
        "effect": "解鎖社會運動、台商西進與自由出國留學；1988年開放報禁"
      },
      {
        "id": "nhi_universal_healthcare",
        "start_year": 1995,
        "category": "healthcare",
        "name": "全民健康保險開辦（3月）",
        "effect": "大幅降低重大傷病醫療破產風險並提高存活率"
      },
      {
        "id": "high_school_bctest",
        "start_year": 2001,
        "end_year": 2013,
        "category": "education",
        "name": "國中基本學力測驗（基測）",
        "effect": "取代高中聯考，仍具明星高中排序壓力"
      },
      {
        "id": "uni_multi_admission",
        "start_year": 2002,
        "category": "education",
        "name": "大學多元入學（學測＋指考）",
        "effect": "取代大學聯考，家庭資源與知識值對推甄申請權重上升"
      },
      {
        "id": "labor_pension_new",
        "start_year": 2005,
        "category": "labor",
        "name": "勞工退休金新制（7月）",
        "effect": "雇主提撥6%至個人專戶，換工作不再年資歸零"
      },
      {
        "id": "consumer_debt_clearance",
        "start_year": 2008,
        "category": "finance",
        "name": "《消費者債務清理條例》施行（4月）",
        "effect": "建立個人更生／清算機制，破產負債角色可合法重啟人生"
      },
      {
        "id": "military_trial_reform",
        "start_year": 2013,
        "category": "justice",
        "name": "《軍事審判法》修法",
        "effect": "承平時期軍人涉案回歸普通法院，軍中不當管教風險下降"
      },
      {
        "id": "compulsory_12yr_ed",
        "start_year": 2014,
        "category": "education",
        "name": "十二年國教與國中會考",
        "effect": "取代基測，免試入學擴大；2022年起大學分科測驗取代指考"
      },
      {
        "id": "patient_autonomy_act",
        "start_year": 2019,
        "category": "healthcare",
        "name": "《病人自主權利法》施行",
        "effect": "解鎖老年期簽署預立醫療決定（拒絕無效插管）選項"
      },
      {
        "id": "same_sex_marriage",
        "start_year": 2019,
        "category": "civil_liberty",
        "name": "同婚專法生效（5/24）",
        "effect": "亞洲第一，同性伴侶解鎖合法結婚與收養"
      },
      {
        "id": "private_uni_exit_act",
        "start_year": 2022,
        "category": "education",
        "name": "《私校退場條例》公布（5月）",
        "effect": "少子化下後段私校停招停辦事件啟動"
      },
      {
        "id": "citizen_judges",
        "start_year": 2023,
        "category": "justice",
        "name": "《國民法官法》上路",
        "effect": "重大刑案導入國民參與審判"
      },
      {
        "id": "youth_mortgage_new",
        "start_year": 2023,
        "category": "housing",
        "name": "新青安房貸上路（8/1）",
        "effect": "最高1,000萬、40年期、寬限5年；2026年8月推青安3.0"
      },
      {
        "id": "gender_equality_3_acts",
        "start_year": 2024,
        "category": "labor",
        "name": "性平三法修法全面上路（3/8）",
        "effect": "加重權勢性騷刑責與雇主防治義務"
      },
      {
        "id": "anti_fraud_4_acts",
        "start_year": 2024,
        "category": "justice",
        "name": "打詐新四法通過（7月）",
        "effect": "重懲高額詐欺、導入科技偵查與人頭帳戶限制"
      },
      {
        "id": "birth_subsidy_100k",
        "start_year": 2026,
        "category": "welfare",
        "name": "好孕三方案生育補助（1/1）",
        "effect": "每胎生育補助一律10萬元"
      }
    ],
    "conscription_rules_male": [
      {
        "period": "pre_1990",
        "end_year": 1989,
        "months": [
          24,
          36
        ],
        "note": "陸軍2年、海空軍與陸戰隊3年；1990年7月統一為2年"
      },
      {
        "period": "1990_1999",
        "start_year": 1990,
        "end_year": 1999,
        "months": [
          24
        ],
        "note": "全軍種統一2年義務役"
      },
      {
        "period": "2000_2007",
        "start_year": 2000,
        "end_year": 2007,
        "months": [
          14,
          22
        ],
        "note": "2000年縮為1年10月並首徵替代役，2004年起逐年減2個月"
      },
      {
        "period": "2008_2012",
        "start_year": 2008,
        "end_year": 2012,
        "months": [
          12
        ],
        "note": "全軍種統一1年義務役"
      },
      {
        "period": "2013_2023",
        "birth_year_range": [
          1994,
          2004
        ],
        "months": [
          4
        ],
        "note": "民國83年次起改4個月軍事訓練役"
      },
      {
        "period": "2024_plus",
        "birth_year_start": 2005,
        "start_year": 2024,
        "months": [
          12
        ],
        "note": "民國94年次起恢復1年義務役，月薪大幅調高近基本工資"
      }
    ],
    "salary_benchmarks_2023_2026": {
      "annual_total_twd_2024": {
        "median": 546000,
        "mean": 732000,
        "share_below_mean": 0.6875
      },
      "by_industry_median_annual_twd_2024": {
        "金融及保險業": 1106000,
        "電力及燃氣供應業": 1091000,
        "電腦電子產品及光學製品製造業": 899000,
        "半導體業_2025_104": 848000,
        "製造業整體": 570000,
        "部分其他服務業": 390000
      },
      "by_education_median_annual_twd_2023": {
        "研究所": 1050000,
        "大學專科": 560000
      },
      "by_age_median_annual_twd_2023": {
        "under_30": 450000,
        "40_to_49": 594000
      },
      "by_company_size_median_annual_twd_2023": {
        "500_plus": 779000,
        "under_4": 386000
      },
      "fresh_grad_monthly_median_twd": {
        "engineering_medical_2021_2023": 37000,
        "humanities_arts_2021_2023": 32000,
        "software_it_role": 39000,
        "tech_software_semi_2026": 40000,
        "finance_insurance_2026": 39000
      },
      "top_non_manager_roles_median_annual_twd": {
        "醫師_2025": 2118000,
        "類比IC設計工程師_2024": 1550000,
        "數位IC設計工程師_2024": 1340000,
        "半導體工程師_2024": 1081000
      }
    }
  },
  "lifetable": {
    "meta": {
      "schema_version": "1.0.0",
      "baseline_decade": "2020s",
      "model_note": "引擎每年以 base_qx_per_1000 × decade_mortality_multiplier × region_adjustment × health_lifestyle_modifiers 計算當年死亡機率，再依 cause_weights 擲骰死因。",
      "sources": [
        "內政部 113–114 年簡易生命表提要",
        "衛福部 113–114 年死因統計年報與癌症登記報告",
        "國健署口腔癌風險研究",
        "交通部與天下雜誌／聯合報整理之事故與自殺統計",
        "氣象署 1911–2019 侵台颱風統計與地震專家週期估計"
      ]
    },
    "decade_mortality_multipliers": [
      {
        "decade": "1950s",
        "approx_life_expectancy": 58.5,
        "multiplier": 2.4
      },
      {
        "decade": "1960s",
        "approx_life_expectancy": 65.0,
        "multiplier": 1.9
      },
      {
        "decade": "1970s",
        "approx_life_expectancy": 69.0,
        "multiplier": 1.6
      },
      {
        "decade": "1980s",
        "approx_life_expectancy": 72.0,
        "multiplier": 1.35
      },
      {
        "decade": "1990s",
        "approx_life_expectancy": 74.5,
        "multiplier": 1.2
      },
      {
        "decade": "2000s",
        "approx_life_expectancy": 77.5,
        "multiplier": 1.1
      },
      {
        "decade": "2010s",
        "approx_life_expectancy": 80.0,
        "multiplier": 1.03
      },
      {
        "decade": "2020s",
        "approx_life_expectancy": 81.27,
        "multiplier": 1.0
      }
    ],
    "age_bands_2020s": [
      {
        "age_min": 0,
        "age_max": 0,
        "stage": "嬰兒期（新生兒）",
        "qx_per_1000_male": 4.3,
        "qx_per_1000_female": 3.9,
        "note": "台灣新生兒（出生28天內）死亡率約4.1‰，近20年多為日韓2–3倍；1980年代前倍率可達2.5–6倍",
        "cause_weights": {
          "congenital_perinatal": 0.7,
          "accident_other": 0.3
        }
      },
      {
        "age_min": 1,
        "age_max": 14,
        "stage": "童年期",
        "qx_per_1000_male": 0.22,
        "qx_per_1000_female": 0.16,
        "cause_weights": {
          "accident": 0.35,
          "cancer": 0.2,
          "congenital_neuro_other": 0.45
        }
      },
      {
        "age_min": 15,
        "age_max": 24,
        "stage": "青少年期",
        "qx_per_1000_male": 0.55,
        "qx_per_1000_female": 0.25,
        "note": "機車交通事故為首位；蓄意自我傷害（自殺）為第二（約11.9%）",
        "cause_weights": {
          "accident_traffic": 0.45,
          "suicide": 0.12,
          "cancer": 0.1,
          "cardio_other": 0.33
        }
      },
      {
        "age_min": 25,
        "age_max": 44,
        "stage": "青壯年期",
        "qx_per_1000_male": 1.4,
        "qx_per_1000_female": 0.65,
        "note": "自殺率每10萬人約18.5人；癌症（女性乳癌、男性口腔／肝癌）與事故占比高",
        "cause_weights": {
          "cancer": 0.28,
          "accident": 0.18,
          "suicide": 0.15,
          "heart_liver": 0.2,
          "other": 0.19
        }
      },
      {
        "age_min": 45,
        "age_max": 64,
        "stage": "中壯年期",
        "qx_per_1000_male": 6.2,
        "qx_per_1000_female": 2.9,
        "note": "癌症為首要死因；45–64歲族群逾5%自殺通報與債務（尤以詐騙為大宗）相關",
        "cause_weights": {
          "cancer": 0.42,
          "heart_cerebro": 0.22,
          "liver_diabetes": 0.1,
          "suicide_accident": 0.08,
          "other": 0.18
        }
      },
      {
        "age_min": 65,
        "age_max": 74,
        "stage": "初老期",
        "qx_per_1000_male": 16.0,
        "qx_per_1000_female": 9.4,
        "note": "60–74歲平均約12.68‰，男性約為女性1.7倍",
        "cause_weights": {
          "cancer": 0.38,
          "heart_disease": 0.14,
          "cerebrovascular": 0.08,
          "pneumonia": 0.07,
          "diabetes_hypertension": 0.1,
          "other": 0.23
        }
      },
      {
        "age_min": 75,
        "age_max": 89,
        "stage": "中老期",
        "qx_per_1000_male": 63.0,
        "qx_per_1000_female": 44.5,
        "note": "75–89歲平均約53.78‰，進入長照高需求期",
        "cause_weights": {
          "cancer": 0.24,
          "heart_disease": 0.15,
          "pneumonia": 0.13,
          "cerebrovascular": 0.09,
          "chronic_fall_dementia_other": 0.39
        }
      },
      {
        "age_min": 90,
        "age_max": 110,
        "stage": "高壽期",
        "qx_per_1000_male": 225.0,
        "qx_per_1000_female": 195.0,
        "note": "90歲以上平均約209.34‰，多屬自然衰老與器官衰竭",
        "cause_weights": {
          "heart_organ_decline": 0.35,
          "pneumonia_respiratory": 0.25,
          "cerebro_hypertension": 0.2,
          "other": 0.2
        }
      }
    ],
    "epidemiology_and_hazard_stats": {
      "cancer": {
        "top_cause_since_year": 1982,
        "deaths_2025": 54838,
        "share_of_all_deaths": 0.3,
        "new_cases_2023": 138051,
        "median_onset_age": {
          "overall": 65,
          "thyroid": 50,
          "breast": 57
        },
        "betel_nut_oral_cancer_risk_multiplier": 28.0
      },
      "traffic_deaths_2024": 2932,
      "maternal_deaths_2024": 11,
      "suicide_2025": {
        "deaths": 3951,
        "rate_per_100k": 16.9,
        "age_45_64_debt_related_report_share": 0.05
      },
      "natural_hazard_annual_rolls": {
        "typhoons_per_year_avg": 3.5,
        "typhoons_range": [
          0,
          7
        ],
        "peak_months": [
          8,
          7,
          9
        ],
        "m7_earthquake_return_period_years": [
          60,
          100
        ]
      }
    },
    "safety_and_help_resources": {
      "age_rating": "15+",
      "edu_mode_query_param": "?edu=1",
      "taiwan_helplines": [
        {
          "number": "1925",
          "name": "衛福部安心專線（24小時心理諮詢與自殺防治）"
        },
        {
          "number": "1995",
          "name": "生命線協談專線"
        },
        {
          "number": "113",
          "name": "婦幼保護專線（家暴、性侵、兒少保護）"
        },
        {
          "number": "165",
          "name": "內政部警政署反詐騙諮詢專線"
        }
      ]
    }
  },
  "events": {
    "meta": {
      "schema_version": "1.0.0",
      "coverage_years": [
        1979,
        2026
      ],
      "educational_structure": "三段式結構：summary（事實）→ institutional_aftermath（制度與社會餘波）→ gameplay_impact（遊戲影響）",
      "region_codes_ref": [
        "ALL",
        "north_taipei",
        "north_hsinchu",
        "central",
        "south_tainan",
        "south_kaohsiung",
        "east_islands"
      ],
      "coverage": "1950–2026（共 56 起重大歷史、社會、金融、災難與法制事件）"
    },
    "events": [
      {
        "id": "EV_1950_us_aid_local_elections",
        "year": 1950,
        "year_end": 1951,
        "category": "economy_politics",
        "regions": [
          "ALL"
        ],
        "title": "韓戰爆發、美援重啟與首度縣市地方自治選舉",
        "summary": "1950 年 6 月韓戰爆發後美國重啟對台經濟與軍事援助（至 1965 年累計約 14.8 億美元），穩定戰後物價與電力交通建設；同年起台灣各縣市首度開辦縣市長與縣市議員直接民選，開啟地方自治實踐。",
        "institutional_aftermath": "美援麵粉與基礎建設支撐了戰後初期民生與外匯穩定，「麵粉袋改衣褲」成為一整代台灣人的共同記憶；地方自治選舉也培養出本土政治參與基礎。",
        "gameplay_impact": {
          "happiness_delta": 2
        },
        "sensitive": false,
        "cultural_footnote_en": "Following the 1950 Korean War outbreak, U.S. economic aid resumed (~$1.48B through 1965), stabilizing postwar Taiwan while local county and city elections began.",
        "sources": [
          "國史館美援史料",
          "中選會台灣地方自治選舉沿革"
        ]
      },
      {
        "id": "EV_1953_land_to_tiller",
        "year": 1953,
        "year_end": 1953,
        "category": "economy_society",
        "regions": [
          "ALL"
        ],
        "title": "土地改革與《實施耕者有其田條例》",
        "summary": "繼三七五減租與公地放領後，政府於 1953 年公布實施《耕者有其田條例》，徵收地主超額出租耕地轉放領給佃農，並以四大公營公司（台泥、台紙、農林、工礦）股票與實物土地債券補償地主。",
        "institutional_aftermath": "台灣農村自耕農比例大幅躍升，農業生產力與農民子女就學意願顯著提高，同時引導部分地主資本轉向工商業，為後續工業化奠定基礎。",
        "gameplay_impact": {
          "happiness_delta": 3,
          "farmer_income_mult": 1.15
        },
        "sensitive": false,
        "cultural_footnote_en": "Taiwan's 1953 Land-to-the-Tiller reform redistributed farmland to tenant farmers and compensated landlords with industrial shares, boosting rural incomes and early industrialization.",
        "sources": [
          "國史館土地改革檔案",
          "農委會戰後農業史"
        ]
      },
      {
        "id": "EV_1954_first_joint_uni_exam",
        "year": 1954,
        "year_end": 1954,
        "category": "education_society",
        "regions": [
          "ALL"
        ],
        "title": "首屆大專聯考開辦（台灣聯考時代揭幕）",
        "summary": "1954 年台灣首度將台灣大學、師範學院、農學院、工學院等四所公立大專校院合併辦理「大專聯合招生考試」，以公平匿名閱卷取代各校單獨招生。",
        "institutional_aftermath": "大專聯考延續 48 年直到 2002 年才改為多元入學，雖大幅強化清寒子弟透過考試翻身的公平性，也深刻塑造了台灣「一試定終身」與補習文化。",
        "gameplay_impact": {
          "happiness_delta": 1
        },
        "sensitive": false,
        "cultural_footnote_en": "Launched in 1954, Taiwan's Joint University Entrance Examination established a meritocratic yet hyper-competitive exam culture lasting 48 years.",
        "sources": [
          "教育部高教司史料",
          "大學聯招會沿革"
        ]
      },
      {
        "id": "EV_1956_min_wage_cross_island",
        "year": 1956,
        "year_end": 1956,
        "category": "economy_infra",
        "regions": [
          "ALL",
          "central",
          "east_islands"
        ],
        "title": "首訂基本工資（300 元）與中部橫貫公路動工",
        "summary": "1956 年政府首度訂定台灣基本工資為每月新台幣 300 元（約合當時基層工廠學徒與勞工生活基準）；同年 7 月中部橫貫公路開工，大批榮民與工程人員以簡陋工具徒手開鑿中央山脈峭壁。",
        "institutional_aftermath": "確立台灣法定最低工資保障起點；中橫於 1960 年通車後首度串聯台中與花蓮，但也付出逾 200 名開路人員殉職的沉痛代價。",
        "gameplay_impact": {
          "happiness_delta": 1,
          "happiness_delta_east": 3
        },
        "sensitive": false,
        "cultural_footnote_en": "In 1956, Taiwan set its first minimum wage (NT$300/month) and began building the Central Cross-Island Highway linking central and eastern Taiwan through rugged mountains.",
        "sources": [
          "勞動部基本工資沿革",
          "公路局中橫公路史料"
        ]
      },
      {
        "id": "EV_1958_823_artillery",
        "year": 1958,
        "year_end": 1958,
        "category": "politics_military",
        "regions": [
          "ALL",
          "east_islands"
        ],
        "title": "八二三砲戰（第二次台海危機）",
        "summary": "1958 年 8 月 23 日金門遭解放軍密集砲擊，44 天內落彈逾 47 萬發，前線軍民與運補官兵承受極高傷亡，隨後演變為長達二十年的「單打雙不打」隔日砲擊常態。",
        "institutional_aftermath": "台海進入長期軍事對峙格局，義務役期維持 2 至 3 年高強度徵兵，抽中赴外島服役的「金馬獎」成為戰後兩代台灣青年最深刻的集體記憶。",
        "gameplay_impact": {
          "happiness_delta": -5,
          "happiness_delta_east": -6
        },
        "sensitive": false,
        "cultural_footnote_en": "The 1958 Second Taiwan Strait Crisis (823 Artillery Battle) saw over 470,000 shells hit Kinmen in 44 days, cementing decades of multi-year male military conscription.",
        "sources": [
          "國防部史政編譯局",
          "國史館八二三戰役史料"
        ]
      },
      {
        "id": "EV_1959_87_flood",
        "year": 1959,
        "year_end": 1959,
        "category": "disaster",
        "regions": [
          "ALL",
          "central",
          "south_tainan"
        ],
        "impact_regions": [
          "central",
          "south_tainan"
        ],
        "disaster_year": 1959,
        "title": "八七水災（戰後台灣最慘重水患）",
        "summary": "1959 年 8 月 7 日至 9 日熱帶性低氣壓引進強烈西南氣流，中南部連降破紀錄特大豪雨，造成 667 人罹難、408 人失蹤、逾 30 萬人無家可歸，農田與鐵公路幾乎全面沖毀，損失約占當年國民所得逾一成。",
        "institutional_aftermath": "政府發動軍民總動員搶修並開徵重建附加稅，推動河川堤防與水利防洪現代化，成為台灣戰後重大災後治理與氣象預警改革的起點。",
        "gameplay_impact": {
          "happiness_delta": -4,
          "happiness_delta_region": -10,
          "health_delta": -2
        },
        "sensitive": false,
        "cultural_footnote_en": "The August 7 Flood of 1959 devastated central and southern Taiwan with over 1,000 dead or missing and 300,000 displaced, sparking nationwide flood-control modernization.",
        "sources": [
          "中央氣象署災害天氣紀錄",
          "水利署八七水災史料"
        ]
      },
      {
        "id": "EV_1960_free_china_lei_chen",
        "year": 1960,
        "year_end": 1960,
        "category": "rights_politics",
        "regions": [
          "ALL"
        ],
        "title": "《自由中國》案與戒嚴言論管制",
        "summary": "1960 年《自由中國》半月刊創辦人雷震籌組反對黨「中國民主黨」，遭當局以涉嫌叛亂逮捕並判刑十年，刊物停刊，展現戒嚴體制下黨禁、報禁與言論審查的高壓現實。",
        "institutional_aftermath": "威權時期在野結社受挫，但也留下台灣戰後自由主義與憲政人權論述火種，深刻影響日後 1970–80 年代黨外民主運動。",
        "gameplay_impact": {
          "happiness_delta": -2
        },
        "sensitive": false,
        "cultural_footnote_en": "In 1960, publisher Lei Chen of Free China magazine was jailed for attempting to form an opposition party, highlighting martial-law censorship while inspiring later democracy advocates.",
        "sources": [
          "國家人權博物館",
          "國史館雷震案史料"
        ]
      },
      {
        "id": "EV_1962_twse_and_ttv",
        "year": 1962,
        "year_end": 1962,
        "category": "economy_culture",
        "regions": [
          "ALL",
          "north_taipei"
        ],
        "title": "臺灣證券交易所開業與台視開播",
        "summary": "1962 年 2 月臺灣證券交易所正式開業，台灣首度建立集中公開交易市場；同年 10 月台灣電視公司（台視）開播，黑白電視機開始出現在街頭電器行與雜貨店，改變常民娛樂生活。",
        "institutional_aftermath": "開啟台灣企業透過資本市場直接籌資的時代，也標誌大眾電視媒體進入台灣家庭，日後更成為全島共同收看少棒與布袋戲的集體記憶載體。",
        "gameplay_impact": {
          "happiness_delta": 3
        },
        "sensitive": false,
        "cultural_footnote_en": "1962 marked two milestones of modern Taiwan: the opening of the Taiwan Stock Exchange and the launch of Taiwan's first television station, TTV.",
        "sources": [
          "臺灣證券交易所沿革",
          "文化部台灣大百科全書"
        ]
      },
      {
        "id": "EV_1963_gloria_typhoon_shihmen",
        "year": 1963,
        "year_end": 1963,
        "category": "disaster",
        "regions": [
          "ALL",
          "north_taipei",
          "north_hsinchu"
        ],
        "impact_regions": [
          "north_taipei",
          "north_hsinchu"
        ],
        "disaster_year": 1963,
        "title": "葛樂禮颱風重創北台灣與石門水庫蓄水防洪",
        "summary": "1963 年 9 月強烈颱風葛樂禮帶來驚人雨量，大台北盆地泡水多日、全台逾 220 人罹難，新建成的石門水庫承受首次極端洩洪考驗，凸顯都會區排水與防洪規劃迫切性。",
        "institutional_aftermath": "促成政府啟動長達數十年的「台北地區防洪計畫」（含後續二重疏洪道與高堤系統），奠定今日雙北防洪安全骨幹。",
        "gameplay_impact": {
          "happiness_delta": -2,
          "happiness_delta_north_taipei": -8
        },
        "sensitive": false,
        "cultural_footnote_en": "Super Typhoon Gloria inundated the Taipei Basin in 1963, prompting the decades-long Taipei Flood Control Project that protects the metro area today.",
        "sources": [
          "中央氣象署百年侵台颱風資料",
          "水利署台北防洪計畫沿革"
        ]
      },
      {
        "id": "EV_1965_us_aid_ends",
        "year": 1965,
        "year_end": 1965,
        "category": "economy",
        "regions": [
          "ALL"
        ],
        "title": "15 年美援正式終止：台灣邁向經濟自立與出口導向",
        "summary": "1965 年 6 月美國評估台灣經濟已具自立能力，正式終止一般經濟援助。面對外匯缺口，台灣全面從進口替代轉向鼓勵外資與外銷加工，經濟成長率逆勢連年突破 9%。",
        "institutional_aftermath": "美援終止未造成衰退，反而加速台灣融入全球貿易供應鏈，開啟長達三十年的「台灣經濟奇蹟」高速成長期。",
        "gameplay_impact": {
          "happiness_delta": 2
        },
        "sensitive": false,
        "cultural_footnote_en": "U.S. economic aid ended in 1965 as Taiwan achieved self-sufficiency, accelerating its pivot to export-oriented manufacturing and decades of rapid growth.",
        "sources": [
          "國發會台灣經濟發展史",
          "美援會檔案"
        ]
      },
      {
        "id": "EV_1966_kaohsiung_epz",
        "year": 1966,
        "year_end": 1966,
        "category": "economy_society",
        "regions": [
          "ALL",
          "south_kaohsiung"
        ],
        "title": "高雄加工出口區成立：女工浪潮與外銷起飛",
        "summary": "1966 年 12 月全球首座「加工出口區」於高雄前鎮正式啟用，結合免稅與單一窗口吸引美日電子、成衣與塑膠大廠設廠，帶動大批農村年輕女性離鄉成為電子廠作業員。",
        "institutional_aftermath": "高雄加工出口區成為開發中國家爭相取經的經濟典範，數十萬名年輕女工用加班薪資支撐起家庭生計與弟妹學費，改寫台灣女性勞動參與史。",
        "gameplay_impact": {
          "happiness_delta": 3,
          "happiness_delta_region": 4
        },
        "sensitive": false,
        "cultural_footnote_en": "Opened in 1966 in Kaohsiung, the world's first Export Processing Zone drew hundreds of thousands of young women from rural areas into electronics and garment assembly.",
        "sources": [
          "經濟部產業園區管理局史料",
          "高雄市歷史博物館"
        ]
      },
      {
        "id": "EV_1968_9yr_compulsory_ed",
        "year": 1968,
        "year_end": 1968,
        "category": "education_society",
        "regions": [
          "ALL"
        ],
        "title": "九年國民義務教育正式實施與紅葉少棒旋風",
        "summary": "1968 年 9 月台灣正式將義務教育從六年延長為九年，全面廢除國小畢業考初中聯考，國中就學率由約 62% 躍升至近 100%；同年台東紅葉少棒隊擊敗來訪日本明星隊，點燃全台棒球熱潮。",
        "institutional_aftermath": "九年國教大幅減輕兒童惡性補習並顯著提升戰後世代（尤其是女童與農村子女）整體受教水準，為 1970–80 年代台灣產業升級提供龐大高素質技術勞動力。",
        "gameplay_impact": {
          "happiness_delta": 5
        },
        "sensitive": false,
        "cultural_footnote_en": "In 1968, Taiwan extended compulsory education from 6 to 9 years, abolishing junior high entrance exams and dramatically boosting secondary schooling—especially for girls.",
        "sources": [
          "教育部九年國民教育實施史料",
          "國史館台灣棒球史"
        ]
      },
      {
        "id": "EV_1969_golden_dragon_baseball",
        "year": 1969,
        "year_end": 1969,
        "category": "culture_society",
        "regions": [
          "ALL"
        ],
        "title": "金龍少棒勇奪威廉波特世界冠軍",
        "summary": "1969 年 8 月台中金龍少棒隊遠征美國威廉波特奪下世界少棒冠軍，全島民眾半夜圍在黑白電視與收音機前同步加油，奪冠瞬間大街小巷鞭炮齊鳴。",
        "institutional_aftermath": "開啟台灣長達十餘年的「三級棒球全盛期」，在國際外交艱難的 1970 年代成為凝聚全台民心最重要的共同文化象徵。",
        "gameplay_impact": {
          "happiness_delta": 4
        },
        "sensitive": false,
        "cultural_footnote_en": "Taichung's Golden Dragon Little League team won the 1969 World Series in Williamsport, launching a golden era of late-night nationwide baseball broadcasts.",
        "sources": [
          "台灣棒球維基館史料",
          "文化部國家文化記憶庫"
        ]
      },
      {
        "id": "EV_1971_un_withdrawal",
        "year": 1971,
        "year_end": 1971,
        "category": "politics_society",
        "regions": [
          "ALL"
        ],
        "title": "退出聯合國（聯大第 2758 號決議）",
        "summary": "1971 年 10 月中華民國退出聯合國，隨後多國相繼斷交，引發台灣戰後首波嚴重外交衝擊與社會不安，部分富裕家庭與留學生開始興起海外移民與綠卡焦慮。",
        "institutional_aftermath": "外交孤立反而促使台灣社會將目光轉回本土，激發 1970 年代鄉土文學論戰、校園民歌運動與對政治本土化、民主化的深層反思。",
        "gameplay_impact": {
          "happiness_delta": -5
        },
        "sensitive": false,
        "cultural_footnote_en": "Taiwan's 1971 withdrawal from the United Nations triggered diplomatic isolation and emigration anxiety, while sparking a cultural turn toward local Taiwanese identity.",
        "sources": [
          "外交部史料",
          "國史館現代史紀事"
        ]
      },
      {
        "id": "EV_1973_oil_crisis_inflation",
        "year": 1973,
        "year_end": 1974,
        "category": "economy_finance",
        "regions": [
          "ALL"
        ],
        "title": "第一次石油危機與 47.5% 惡性通膨衝擊",
        "summary": "1973 年底中東戰爭引爆全球第一次石油危機，國際油價暴漲四倍。高度仰賴能源進口的台灣在 1974 年消費者物價指數（CPI）年增率狂飆至 47.5%，民生物資搶購頻傳、台股腰斬近六成。",
        "institutional_aftermath": "政府推出「穩定當前經濟措施方案」大幅調升利率與油電價一次反映，並加快能源多元與重化工業自主腳步，僅一年便成功壓回通膨。",
        "gameplay_impact": {
          "happiness_delta": -5
        },
        "sensitive": false,
        "cultural_footnote_en": "The 1973–74 oil shock sent Taiwan's annual inflation soaring to 47.5% and halved stock prices, prompting sharp interest-rate hikes and rapid economic stabilization.",
        "sources": [
          "主計總處歷年消費者物價指數",
          "中央銀行經濟金融史"
        ]
      },
      {
        "id": "EV_1974_ten_major_projects",
        "year": 1974,
        "year_end": 1978,
        "category": "economy_infra",
        "regions": [
          "ALL"
        ],
        "title": "十大建設全面啟動：重工業與現代交通骨幹成形",
        "summary": "面對石油危機景氣低谷，政府自 1974 年起大手筆推動「十大建設」，涵蓋中山高速公路、西部鐵路電氣化、北迴鐵路、中正國際機場、台中港、蘇澳港、中鋼、中船、石化與核能發電廠。",
        "institutional_aftermath": "大幅擴大內需就業抵銷全球衰退，更在 1970 年代末完成台灣現代化交通與基礎重工業網路，為 1980 年代高科技起飛打下關鍵底座。",
        "gameplay_impact": {
          "happiness_delta": 4
        },
        "sensitive": false,
        "cultural_footnote_en": "Launched in 1974 amid global recession, the Ten Major Construction Projects built Taiwan's first freeway, international airport, steelworks, and electrified rail backbone.",
        "sources": [
          "國發會十大建設檔案",
          "交通部台灣交通史"
        ]
      },
      {
        "id": "EV_1976_abolish_self_study_folk_song",
        "year": 1976,
        "year_end": 1976,
        "category": "education_culture",
        "regions": [
          "ALL"
        ],
        "title": "廢除自費留學考試與校園民歌運動興起",
        "summary": "1976 年教育部正式廢除實施近二十年的「自費留學考試」，大幅降低大學生自費出國門檻，配合經濟起飛引爆赴美留學熱潮；同時大學校園掀起「唱自己的歌」民歌浪潮，〈龍的傳人〉、〈橄欖樹〉傳唱全台。",
        "institutional_aftermath": "自費留學普及培養出日後 1980–90 年代回台創立竹科與半導體產業的海歸工程師世代；校園民歌則催生台灣華語流行音樂的黃金產業基礎。",
        "gameplay_impact": {
          "happiness_delta": 3
        },
        "sensitive": false,
        "cultural_footnote_en": "In 1976, abolishing the self-funded study-abroad exam fueled a wave of Taiwanese students heading to the U.S., while campus folk songs laid the groundwork for Mandopop.",
        "sources": [
          "教育部國際及兩岸教育司沿革",
          "文化部台灣流行音樂史"
        ]
      },
      {
        "id": "EV_1977_zhongli_incident",
        "year": 1977,
        "year_end": 1977,
        "category": "rights_politics",
        "regions": [
          "ALL",
          "north_hsinchu"
        ],
        "title": "中壢事件（戒嚴時期首次大規模選舉抗議）",
        "summary": "1977 年 11 月桃園縣長選舉投票日，中壢國小投開票所爆發作票爭議，引爆逾萬民眾包圍警局抗議衝突，最終無黨籍候選人許信良高票當選。",
        "institutional_aftermath": "中壢事件震撼戒嚴體制，象徵戰後成長的台灣中產與青年世代開始積極走上街頭捍衛選票公平，揭開 1970 年代末黨外運動高潮。",
        "gameplay_impact": {
          "happiness_delta": -1
        },
        "sensitive": false,
        "cultural_footnote_en": "The 1977 Zhongli Incident over alleged ballot tampering became Taiwan's first major street protest under martial law, energizing the grassroots democracy movement.",
        "sources": [
          "國史館中壢事件史料",
          "台灣大百科全書"
        ]
      },
      {
        "id": "EV_1978_highway1_us_break",
        "year": 1978,
        "year_end": 1978,
        "category": "economy_politics",
        "regions": [
          "ALL"
        ],
        "title": "中山高速公路全線通車與台美斷交宣告",
        "summary": "1978 年 10 月台灣首條高速公路「中山高（國道一號）」基隆至高雄全線通車，南北車程縮短至四個多小時；僅兩個月後（12 月 16 日）美國宣布與中華民國斷交，全台陷入震驚與自強愛國捐款潮。",
        "institutional_aftermath": "中山高徹底改寫西部走廊物流與城鄉流動；台美斷交則促使美國國會於隔年通過《台灣關係法》，並加速台灣推動產業升級與科技自主（新竹科學園區籌設）。",
        "gameplay_impact": {
          "happiness_delta": -3
        },
        "sensitive": false,
        "cultural_footnote_en": "In late 1978, Taiwan celebrated the completion of its first north-south freeway just weeks before the U.S. announced diplomatic severance, prompting rapid industrial and tech self-reliance.",
        "sources": [
          "高公局中山高通車史料",
          "外交部台美關係檔案"
        ]
      },
      {
        "id": "EV_1979_kaohsiung_incident",
        "year": 1979,
        "year_end": 1980,
        "category": "politics_society",
        "regions": [
          "south_kaohsiung",
          "ALL"
        ],
        "title": "美麗島事件",
        "summary": "黨外人士於高雄舉辦世界人權日集會引發警民衝突，當局展開全島大逮捕並以軍法大審判處8名核心人物重刑。",
        "institutional_aftermath": "引發海內外聲援與美國國會關切，催化台灣本土民主意識與黨外律師世代崛起，成為走向民主化的關鍵轉捩點。",
        "gameplay_impact": {
          "narrative_tag": "martial_law_caution",
          "happiness_delta": -2
        },
        "sensitive": false,
        "cultural_footnote_en": "A 1979 pro-democracy rally in Kaohsiung crushed under Martial Law; the resulting military trials catalyzed Taiwan's democratization movement.",
        "sources": [
          "國家人權博物館史料"
        ],
        "protagonist_involvement": {
          "base_prob": 0.14,
          "regions": [
            "south_kaohsiung",
            "north_taipei"
          ],
          "age_range": [
            18,
            55
          ],
          "trait_mult": {
            "civic_minded": 2.8,
            "cautious": 0.25,
            "sensitive_introvert": 0.4
          },
          "exp_tags": [
            "higher_ed"
          ],
          "outcomes": [
            {
              "weight": 0.7,
              "severity": "trajectory",
              "narrative": "你因關心民主集會出現在高雄人權日現場，事後遭情治單位約談並被原公司解僱，職涯被迫轉向民間自營或日後投入台灣公民改革。",
              "happiness_delta": -12,
              "knowledge_delta": 10,
              "job_lost": true,
              "money_ratio_delta": -0.2
            },
            {
              "weight": 0.3,
              "severity": "trajectory_heavy",
              "narrative": "你因參與現場聲援捲入戒嚴軍法偵辦，經歷數年牢獄與監視才於解嚴前獲釋，整個人生軌跡徹底改寫。",
              "health_delta": -15,
              "happiness_delta": -20,
              "knowledge_delta": 12,
              "job_lost": true,
              "money_ratio_delta": -0.45
            }
          ]
        }
      },
      {
        "id": "EV_1979_yucheng",
        "year": 1979,
        "year_end": 1979,
        "category": "society_food_safety",
        "regions": [
          "central"
        ],
        "title": "米糠油多氯聯苯中毒案（油症事件）",
        "summary": "彰化油脂公司生產的米糠油遭多氯聯苯污染，造成台中、彰化約2,000餘人中毒，毒素長期累積甚至遺傳至下一代。",
        "institutional_aftermath": "台灣首起大規模工業化學食安悲劇；歷經36年倡議，立法院於2015年三讀通過《油症患者健康照護服務條例》提供照護與撫慰金。",
        "gameplay_impact": {
          "trigger_prob_in_region": 0.002,
          "health_permanent_delta": -15,
          "follow_up_year": 2015
        },
        "sensitive": false,
        "cultural_footnote_en": "Taiwan's first mass industrial food-poisoning disaster (PCB-contaminated rice bran oil), eventually leading to a dedicated victim healthcare law in 2015.",
        "sources": [
          "衛福部油症專區",
          "立法院法律沿革"
        ],
        "protagonist_involvement": {
          "base_prob": 0.14,
          "regions": [
            "central"
          ],
          "age_range": [
            0,
            75
          ],
          "trait_mult": {
            "family_first": 1.3
          },
          "exp_tags": [],
          "outcomes": [
            {
              "weight": 0.75,
              "severity": "health_trajectory",
              "narrative": "家中長期食用的米糠油遭多氯聯苯污染，你與家人出現皮膚病變與慢性疲倦，此後數十年奔走醫療與求償，直到 2015 年專法通過才獲國家照護。",
              "health_delta": -24,
              "happiness_delta": -18,
              "money_ratio_delta": -0.15,
              "set_flag": "yucheng_affected"
            },
            {
              "weight": 0.25,
              "severity": "economic_minor",
              "narrative": "家裡買到同批問題油所幸食用量少，但親戚中毒嚴重，全家投入協助照護與長期醫藥支出。",
              "health_delta": -8,
              "happiness_delta": -10,
              "money_ratio_delta": -0.12
            }
          ]
        }
      },
      {
        "id": "EV_1982_li_shike_wang_yingxian",
        "year": 1982,
        "year_end": 1982,
        "category": "crime_justice",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "李師科搶案與王迎先冤死案",
        "summary": "退伍老兵李師科持槍搶劫土地銀行古亭分行，為台灣治安史首起持槍搶銀行案；辦案期間無辜計程車司機王迎先遭刑求後跳河身亡。",
        "institutional_aftermath": "促成《刑事訴訟法》第27條修正（「王迎先條款」），確立偵查中被告得隨時選任辯護人以防刑求；並催生民眾進銀行須脫安全帽與口罩的規範。",
        "gameplay_impact": {
          "unlock_daily_flavor": "bank_remove_helmet",
          "justice_index_delta": 5
        },
        "sensitive": true,
        "cultural_footnote_en": "Taiwan's first armed bank robbery led to a wrongful police torture death, prompting the 1982 'Wang Ying-hsien Clause' granting suspects the right to counsel during interrogation—and the rule to remove helmets in banks.",
        "sources": [
          "司法院與刑事訴訟法修法沿革"
        ]
      },
      {
        "id": "EV_1984_henry_liu",
        "year": 1984,
        "year_end": 1985,
        "category": "crime_politics",
        "regions": [
          "ALL"
        ],
        "title": "江南案",
        "summary": "旅美作家劉宜良（筆名江南）在加州遭台灣情治人員指使黑幫暗殺，引發美台關係劇烈震盪。",
        "institutional_aftermath": "重創威權體制國際形象並終結蔣家接班可能，直接加速1987年解嚴、1988年開放報禁與1992年《刑法》第100條修正。",
        "gameplay_impact": {
          "narrative_only": true,
          "precursor_to": "EV_1987_martial_law_lifted"
        },
        "sensitive": false,
        "cultural_footnote_en": "The 1984 assassination of Taiwanese-American writer Henry Liu in California severely strained US-Taiwan ties and accelerated the end of Martial Law.",
        "sources": [
          "國史館史料"
        ]
      },
      {
        "id": "EV_1985_1990_bubble_boom",
        "year": 1985,
        "year_end": 1990,
        "category": "economy_finance",
        "regions": [
          "ALL"
        ],
        "title": "「台灣錢淹腳目」股房狂飆期",
        "summary": "新台幣從40.6升值至25.56，台股從636點飆漲20倍至1990年2月12,682點，台北市房價飆至每坪25.5萬元高峰。",
        "institutional_aftermath": "奠定台灣一代人的財富想像，但也埋下泡沫破滅與投機文化的歷史教訓。",
        "gameplay_impact": {
          "asset_growth_mult": 1.35,
          "housing_cost_mult": 1.8
        },
        "sensitive": false,
        "cultural_footnote_en": "Known as 'Taiwan money flooding the ankles,' currency appreciation fueled a 20x stock rally and 10x property boom in the late 1980s.",
        "sources": [
          "工商時報",
          "理財周刊"
        ]
      },
      {
        "id": "EV_1985_tenth_credit",
        "year": 1985,
        "year_end": 1985,
        "category": "finance",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "十信案（台北第十信用合作社弊案）",
        "summary": "蔡辰洲涉違規超貸掏空十信並引爆擠兌風暴，受害人數逾10萬人，震撼政商界。",
        "institutional_aftermath": "台灣史上首起震撼全國的大型金融弊案；促成政府擴大金檢、1989年修正《銀行法》並開放民營新銀行設立，開啟現代金融監理。",
        "gameplay_impact": {
          "bank_run_prob_north_taipei": 0.04,
          "savings_loss_if_hit": 0.25
        },
        "sensitive": false,
        "cultural_footnote_en": "A massive 1985 credit-cooperative embezzlement scandal affecting over 100,000 depositors, triggering Taiwan's modern banking deregulation and oversight reforms.",
        "sources": [
          "財政部與金融監督管理史料"
        ],
        "protagonist_involvement": {
          "base_prob": 0.12,
          "regions": [
            "north_taipei"
          ],
          "age_range": [
            22,
            70
          ],
          "trait_mult": {
            "risk_taker": 2.0,
            "cautious": 0.5
          },
          "exp_tags": [
            "has_savings",
            "finance_sector"
          ],
          "outcomes": [
            {
              "weight": 0.7,
              "severity": "economic_major",
              "narrative": "你將大半積蓄存放在台北十信體系貪圖較高利息，弊案爆發後遭遇擠兌與關係企業跳票，畢生存款蒸發逾半。",
              "money_ratio_delta": -0.55,
              "happiness_delta": -20
            },
            {
              "weight": 0.3,
              "severity": "economic_severe",
              "narrative": "你任職於十信關聯商號且存款全數押入，擠兌風暴導致失業與嚴重負債，家庭生活陷入谷底。",
              "money_ratio_delta": -0.75,
              "happiness_delta": -28,
              "job_lost": true,
              "heavy_debt": true
            }
          ]
        }
      },
      {
        "id": "EV_1986_industrial_peak",
        "year": 1986,
        "year_end": 1986,
        "category": "economy_politics",
        "regions": [
          "ALL"
        ],
        "title": "台灣工業化頂峰與民進黨成立",
        "summary": "工業占GDP 47.11%、製造業39.35%皆達歷史最高峰；同年民主進步黨於圓山大飯店宣布成立。",
        "institutional_aftermath": "台灣開始由製造業主導邁向服務業（1989年破50%），並踏入政黨競爭時代。",
        "gameplay_impact": {
          "parent_factory_job_weight": 0.45
        },
        "sensitive": false,
        "cultural_footnote_en": "Taiwan's manufacturing share of GDP peaked in 1986—the same year the opposition Democratic Progressive Party (DPP) was founded despite Martial Law.",
        "sources": [
          "遠景基金會季刊",
          "遠見大事紀"
        ]
      },
      {
        "id": "EV_1987_martial_law_lifted",
        "year": 1987,
        "year_end": 1988,
        "category": "politics_economy",
        "regions": [
          "ALL"
        ],
        "title": "解嚴、台積電成立與開放探親報禁",
        "summary": "1987年2月台積電成立、7月15日宣布解除長達38年戒嚴、11月開放赴大陸探親；1988年元旦開放報禁並爆發520農民運動。",
        "institutional_aftermath": "政治全面解凍、台商西進序幕拉開，同時埋下日後台灣成為全球半導體核心的種子。",
        "gameplay_impact": {
          "unlock_switch": "lift_martial_law",
          "happiness_delta": 4
        },
        "sensitive": false,
        "cultural_footnote_en": "1987 was a watershed year: TSMC was founded in February, 38 years of Martial Law ended in July, and family visits to mainland China opened in November.",
        "sources": [
          "遠見大事紀",
          "關鍵評論網"
        ]
      },
      {
        "id": "EV_1990_crash_hongyuan",
        "year": 1990,
        "year_end": 1990,
        "category": "finance",
        "regions": [
          "ALL"
        ],
        "title": "台股萬二崩盤與鴻源吸金倒閉案",
        "summary": "台股8個月內從12,682點暴跌80%至2,485點（歷時30年才突破），台北市房價回跌30%；同年以月息4分吸金的鴻源機構倒閉，留下約940億元負債與16萬名債權人。",
        "institutional_aftermath": "促使政府嚴查地下投資公司並修法重罰非法吸金，無數台灣家庭一夕致負債。",
        "gameplay_impact": {
          "stock_return": -0.8,
          "resolve_decision_flag": "trapped_in_high_yield"
        },
        "sensitive": false,
        "cultural_footnote_en": "Taiwan's stock market plunged 80% in eight months in 1990—taking 30 years to recover its peak—just as the NT$94B Hongyuan Ponzi scheme collapsed.",
        "sources": [
          "EBC台股股災回顧",
          "股感",
          "理財周刊"
        ],
        "protagonist_involvement": {
          "base_prob": 0.14,
          "regions": [
            "ALL"
          ],
          "age_range": [
            22,
            70
          ],
          "trait_mult": {
            "risk_taker": 2.6,
            "cautious": 0.25,
            "sociable": 1.3
          },
          "exp_tags": [
            "has_savings",
            "has_stocks"
          ],
          "outcomes": [
            {
              "weight": 0.65,
              "severity": "economic_major",
              "narrative": "台股從 12,682 點崩盤加上鴻源倒閉，你融資追高與跟親友投入的資金慘遭斷頭，資產暴跌七成、從此背上多年債務。",
              "money_ratio_delta": -0.7,
              "stock_ratio_delta": -0.85,
              "happiness_delta": -26,
              "heavy_debt": true
            },
            {
              "weight": 0.35,
              "severity": "economic_severe",
              "narrative": "你把房產拿去二胎抵押投入鴻源與台股高檔，1990 泡沫破滅後房屋遭法拍，被迫租屋重頭來過。",
              "money_ratio_delta": -0.85,
              "stock_ratio_delta": -0.95,
              "lose_home": true,
              "happiness_delta": -32,
              "heavy_debt": true
            }
          ]
        }
      },
      {
        "id": "EV_1991_su_jianhe",
        "year": 1991,
        "year_end": 2012,
        "category": "crime_justice",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "蘇建和案（纏訟21年的司法轉折）",
        "summary": "蘇建和、劉秉郎、莊林勳三人涉汐止命案遭判死刑定讞，但因刑求自白與科學鑑識爭議纏訟21年，終在2012年8月無罪定讞。",
        "institutional_aftermath": "推動台灣刑事司法改革，促成2003年《刑事訴訟法》強化無罪推定與不正自白排除，並催生2010年《刑事妥速審判法》。",
        "gameplay_impact": {
          "narrative_tag": "judicial_reform",
          "knowledge_delta_law_track": 3
        },
        "sensitive": true,
        "cultural_footnote_en": "A landmark wrongful-conviction case lasting 21 years before final acquittal in 2012, driving Taiwan's adoption of the Speedy Trial Act and stricter confession rules.",
        "sources": [
          "司法院判決紀錄",
          "民間司改會史料"
        ]
      },
      {
        "id": "EV_1992_health_kindergarten",
        "year": 1992,
        "year_end": 1992,
        "category": "society_safety",
        "regions": [
          "north_taipei",
          "north_hsinchu",
          "ALL"
        ],
        "title": "健康幼稚園火燒車事件",
        "summary": "台北健康幼稚園校外教學遊覽車於桃園平鎮起火，因安全門卡死釀成23人死亡（含捨身救童的林靖娟老師）、9人輕重傷。",
        "institutional_aftermath": "催生靖娟兒童安全文教基金會，全面翻修遊覽車安全門法規與校外教學幼童交通安全規範。",
        "gameplay_impact": {
          "child_accident_risk_mult_after": 0.9,
          "unlock_daily_flavor": "school_bus_safety_drill"
        },
        "sensitive": true,
        "cultural_footnote_en": "A tragic 1992 kindergarten bus fire that killed 23, sparking strict tour-bus emergency exit laws and Taiwan's leading child-safety foundation.",
        "sources": [
          "靖娟兒童安全文教基金會史料"
        ],
        "protagonist_involvement": {
          "base_prob": 0.14,
          "regions": [
            "north_taipei",
            "north_hsinchu"
          ],
          "age_range": [
            25,
            42
          ],
          "trait_mult": {
            "family_first": 1.3
          },
          "exp_tags": [
            "has_children"
          ],
          "outcomes": [
            {
              "weight": 0.8,
              "severity": "trauma_trajectory",
              "narrative": "你的孩子搭上出遊遊覽車經歷驚魂火警所幸及時獲救，但全家歷經深刻心理創傷，此後你積極投入兒童交通安全倡議。",
              "happiness_delta": -20,
              "social_delta": 8
            },
            {
              "weight": 0.2,
              "severity": "fatal_family",
              "narrative": "你的親友在這場遊覽車逃生門卡死悲劇中罹難，巨大悲痛徹底改變你對生命與公共安全的看法。",
              "happiness_delta": -35,
              "health_delta": -10
            }
          ]
        }
      },
      {
        "id": "EV_1994_410_edu_reform",
        "year": 1994,
        "year_end": 1994,
        "category": "education_society",
        "regions": [
          "ALL"
        ],
        "title": "410 教改大遊行與廣設高中大學",
        "summary": "1994年大學錄取率僅44%，民間發起「410教改遊行」訴求廣設高中大學與減輕升學壓力。",
        "institutional_aftermath": "大專校院從1994年130所暴增至2011年163所，錄取率一路攀升至2019年近100%，徹底改變世代升學結構，也埋下日後少子化退場伏筆。",
        "gameplay_impact": {
          "uni_admission_rate_trend": "rapid_increase"
        },
        "sensitive": false,
        "cultural_footnote_en": "The 1994 education reform movement demanded wider university access, pushing admission rates from 44% to nearly 100% within two decades.",
        "sources": [
          "關鍵評論網",
          "聯合報專題",
          "教育部"
        ]
      },
      {
        "id": "EV_1995_welcome_fire",
        "year": 1995,
        "year_end": 1995,
        "category": "society_safety",
        "regions": [
          "central",
          "ALL"
        ],
        "title": "台中衛爾康西餐廳大火",
        "summary": "台中市衛爾康西餐廳瓦斯外洩引燃易燃裝潢且逃生門遭封死，奪走64條人命，為台灣單一建築物死亡人數最多的火災。",
        "institutional_aftermath": "促成《消防法》與《建築法》大幅修法、強制公共場所使用防焰材料，並建立消防設備師／士國家專技證照制度。",
        "gameplay_impact": {
          "public_fire_accident_mult_after": 0.75
        },
        "sensitive": true,
        "cultural_footnote_en": "Taiwan's deadliest single-building fire (64 deaths in Taichung) led to sweeping fire-code overhauls and mandatory flame-retardant standards.",
        "sources": [
          "內政部消防署法制沿革"
        ],
        "protagonist_involvement": {
          "base_prob": 0.14,
          "regions": [
            "central"
          ],
          "age_range": [
            16,
            65
          ],
          "trait_mult": {
            "sociable": 2.3,
            "sensitive_introvert": 0.35,
            "cautious": 0.6
          },
          "exp_tags": [],
          "outcomes": [
            {
              "weight": 0.72,
              "severity": "injury_trauma",
              "narrative": "案發當晚你正在衛爾康西餐廳聚餐，火勢瞬間吞噬裝潢，你奮力破窗逃生但嚴重嗆傷住院，康復後長期畏懼密閉空間。",
              "health_delta": -25,
              "happiness_delta": -22,
              "money_ratio_delta": -0.15
            },
            {
              "weight": 0.28,
              "severity": "fatal",
              "narrative": "你在台中衛爾康西餐廳聚餐時遭遇瓦斯外洩引發的大火，因逃生通道受阻不幸罹難。",
              "fatal": true,
              "death_cause": "1995 年台中衛爾康西餐廳大火（公共安全事故）"
            }
          ]
        }
      },
      {
        "id": "EV_1996_1997_three_major_crimes",
        "year": 1996,
        "year_end": 1997,
        "category": "crime_society",
        "regions": [
          "north_hsinchu",
          "south_kaohsiung",
          "north_taipei",
          "ALL"
        ],
        "title": "1996–1997 三大命案震撼（劉邦友、彭婉如、白曉燕案）",
        "summary": "半年間接連爆發桃園縣長官邸血案、婦運領袖彭婉如搭計程車遇害，以及白曉燕綁架撕票案，引爆「五〇四為台灣而走」大遊行。",
        "institutional_aftermath": "彭婉如案火速催生《性侵害犯罪防治法》（1997）與計程車管理改革；白曉燕案迫使內閣總辭，並引發台灣對SNG現場直播媒體倫理的深刻反省。",
        "gameplay_impact": {
          "happiness_delta": -4,
          "social_anxiety_flag": true
        },
        "sensitive": true,
        "cultural_footnote_en": "Three shocking crimes in 1996–97 triggered mass protests, toppled the cabinet, enacted Taiwan's Sexual Assault Crime Prevention Act, and reshaped TV news ethics.",
        "sources": [
          "立法院法制沿革",
          "台灣新聞倫理史料"
        ]
      },
      {
        "id": "EV_1997_1998_asian_local_crisis",
        "year": 1997,
        "year_end": 1998,
        "category": "finance",
        "regions": [
          "ALL"
        ],
        "title": "亞洲金融風暴與台灣本土型金融風暴",
        "summary": "1997年台股受亞洲金融風暴重挫39.7%；1998下半年再爆本土財團交叉持股超貸與企業跳票，銀行逾放比飆升。",
        "institutional_aftermath": "促使政府推動金融改革、打消呆帳與銀行整併，並於2004年成立金融監督管理委員會（金管會）。",
        "gameplay_impact": {
          "stock_return_1997": -0.397,
          "sme_layoff_risk_mult": 1.4
        },
        "sensitive": false,
        "cultural_footnote_en": "Spillovers from the 1997 Asian Financial Crisis exposed domestic corporate over-leveraging, culminating in banking consolidation and the 2004 creation of Taiwan's FSC.",
        "sources": [
          "科技新報",
          "金管會史料"
        ]
      },
      {
        "id": "EV_1999_921_earthquake",
        "year": 1999,
        "year_end": 1999,
        "category": "disaster",
        "regions": [
          "central",
          "north_taipei",
          "ALL"
        ],
        "title": "921 集集大地震（規模 7.3）",
        "summary": "9月21日凌晨發生規模7.3強震，造成2,415人死亡、29人失蹤、11,305人受傷，房屋全倒51,711間、半倒53,768間；台北東星大樓87人罹難。",
        "institutional_aftermath": "政府於2000年通過《災害防救法》，定9月21日為國家防災日，並全面大幅提高新建物耐震設計標準。",
        "gameplay_impact": {
          "trigger_decision": "D22_major_disaster",
          "central_home_damage_prob": 0.12
        },
        "sensitive": true,
        "cultural_footnote_en": "The M7.3 Jiji earthquake killed over 2,400 people, leading to Taiwan's Disaster Prevention and Protection Act and far stricter seismic building codes.",
        "sources": [
          "風傳媒",
          "NOWnews"
        ],
        "impact_regions": [
          "central",
          "north_taipei"
        ],
        "disaster_year": 1999,
        "protagonist_involvement": {
          "base_prob": 0.16,
          "regions": [
            "central",
            "north_taipei"
          ],
          "age_range": [
            0,
            90
          ],
          "trait_mult": {
            "family_first": 1.2
          },
          "exp_tags": [
            "homeowner"
          ],
          "outcomes": [
            {
              "weight": 0.55,
              "severity": "economic_housing",
              "narrative": "921 凌晨天搖地動，你居住的房屋結構嚴重受損判定全倒，全家住進組合屋並背負舊房貸與重建壓力，人生被迫重來。",
              "lose_home": true,
              "money_ratio_delta": -0.45,
              "happiness_delta": -24,
              "health_delta": -8
            },
            {
              "weight": 0.3,
              "severity": "injury_relocate",
              "narrative": "強震中你被倒塌家具壓傷獲救，歷經漫長復健後舉家遷離震央區展開新生活。",
              "lose_home": true,
              "health_delta": -22,
              "happiness_delta": -20,
              "money_ratio_delta": -0.35,
              "force_relocate": true
            },
            {
              "weight": 0.15,
              "severity": "fatal",
              "narrative": "921 規模 7.3 強震深夜襲擊，你所在的建物於劇烈搖晃中倒塌，不幸於震災中罹難。",
              "fatal": true,
              "death_cause": "1999 年 921 集集大地震（建物倒塌）"
            }
          ]
        }
      },
      {
        "id": "EV_2000_dotcom_bubble",
        "year": 2000,
        "year_end": 2001,
        "category": "finance",
        "regions": [
          "ALL"
        ],
        "title": "網路泡沫與製造業外移低谷",
        "summary": "全球網路泡沫破滅使台股大跌66.6%，2001年台灣製造業占GDP降至28.89%低點，企業加速外移。",
        "institutional_aftermath": "科技業歷經洗牌，台商大舉西進中國設廠成為下一世代職場主旋律。",
        "gameplay_impact": {
          "stock_return": -0.666,
          "tech_layoff_risk_mult": 1.3
        },
        "sensitive": false,
        "cultural_footnote_en": "The dot-com crash wiped out 66.6% of Taiwan's stock index while accelerating manufacturing offshoring to mainland China.",
        "sources": [
          "科技新報",
          "工商時報"
        ]
      },
      {
        "id": "EV_2002_wto_accession",
        "year": 2002,
        "year_end": 2002,
        "category": "economy",
        "regions": [
          "south_tainan",
          "central",
          "south_kaohsiung",
          "east_islands"
        ],
        "title": "台灣加入世界貿易組織（WTO）",
        "summary": "2002年1月1日正式入會；農委會估計入會首年農業產值減少6.8%，影響1.8萬至2.7萬名農民。",
        "institutional_aftermath": "進口農產品衝擊傳統農業，加速農村轉型精緻農業與農村青年外移都市。",
        "gameplay_impact": {
          "farmer_income_mult": 0.88
        },
        "sensitive": false,
        "cultural_footnote_en": "Taiwan's 2002 WTO entry opened domestic agricultural markets, pressuring small family farms and accelerating rural-to-urban migration.",
        "sources": [
          "遠見雜誌"
        ]
      },
      {
        "id": "EV_2003_sars_and_0050",
        "year": 2003,
        "year_end": 2003,
        "category": "epidemic_finance",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "SARS 和平醫院封院與 0050 ETF 成立",
        "summary": "SARS期間全台通報668例、181例死亡、逾15萬人居家隔離；4月24日台北和平醫院封院釀醫護與院內民眾重大傷亡。同年台灣首檔指數ETF「0050」成立。",
        "institutional_aftermath": "SARS重創促成台灣建立中央流行疫情指揮中心與負壓隔離醫療體系，成為2020年COVID-19初期防堵成功的關鍵經驗。",
        "gameplay_impact": {
          "trigger_decision": "D23_pandemic_dilemma",
          "unlock_investment": "etf_0050"
        },
        "sensitive": true,
        "cultural_footnote_en": "The traumatic 2003 SARS lockdown of Taipei's Heping Hospital forged the public-health command system that later guided Taiwan's COVID-19 response.",
        "sources": [
          "IJID",
          "公視新聞",
          "經濟日報"
        ],
        "protagonist_involvement": {
          "base_prob": 0.08,
          "regions": [
            "north_taipei"
          ],
          "age_range": [
            18,
            78
          ],
          "trait_mult": {
            "workaholic": 1.8,
            "civic_minded": 1.4,
            "cautious": 0.5
          },
          "exp_tags": [
            "healthcare_sector"
          ],
          "outcomes": [
            {
              "weight": 0.65,
              "severity": "health_trauma",
              "narrative": "你因就醫或執勤碰上和平醫院無預警封院，歷經高壓隔離與感染風險，雖平安康復卻留下深刻的創傷記憶。",
              "health_delta": -16,
              "happiness_delta": -18,
              "money_ratio_delta": -0.1
            },
            {
              "weight": 0.2,
              "severity": "severe_recovery",
              "narrative": "你在 SARS 疫情期間確診重症住進負壓隔離病房，與死神拔河數週後倖存，但肺功能永久受損。",
              "health_delta": -32,
              "happiness_delta": -20,
              "money_ratio_delta": -0.2
            },
            {
              "weight": 0.15,
              "severity": "fatal",
              "narrative": "你在 2003 年 SARS 院內感染風暴中確診引發嚴重急性呼吸窘迫，不幸病逝。",
              "fatal": true,
              "death_cause": "2003 年 SARS 嚴重急性呼吸道症候群"
            }
          ]
        }
      },
      {
        "id": "EV_2004_procomp_scandal",
        "year": 2004,
        "year_end": 2004,
        "category": "finance",
        "regions": [
          "ALL"
        ],
        "title": "博達科技掏空案",
        "summary": "明星科技股博達無預警聲請重整，揭發長期虛列60億元假應收帳款作假帳掏空案，投保中心受理逾萬名投資人求償逾58億元。",
        "institutional_aftermath": "成為台灣公司治理轉捩點，強化財報不實之會計師與董監責任，並全面推動獨立董事制度與投資人集體求償機制。",
        "gameplay_impact": {
          "individual_stock_fraud_prob": 0.03
        },
        "sensitive": false,
        "cultural_footnote_en": "A NT$6B accounting fraud at star tech firm Procomp shocked retail investors and ushered in Taiwan's independent-director corporate governance rules.",
        "sources": [
          "投保中心與金管會公開資料"
        ],
        "protagonist_involvement": {
          "base_prob": 0.1,
          "regions": [
            "ALL"
          ],
          "age_range": [
            24,
            70
          ],
          "trait_mult": {
            "risk_taker": 2.5,
            "cautious": 0.3
          },
          "exp_tags": [
            "has_stocks"
          ],
          "outcomes": [
            {
              "weight": 1.0,
              "severity": "economic_major",
              "narrative": "你深信財報亮眼的明星科技股博達而重壓大半股票資產，無預警重整後股價連吞跌停淪為壁紙，多年積蓄重創。",
              "stock_ratio_delta": -0.75,
              "money_ratio_delta": -0.2,
              "happiness_delta": -20
            }
          ]
        }
      },
      {
        "id": "EV_2005_2006_credit_card_crisis",
        "year": 2005,
        "year_end": 2006,
        "category": "finance_society",
        "regions": [
          "ALL"
        ],
        "title": "雙卡風暴（卡奴危機）",
        "summary": "銀行浮濫發行信用卡與現金卡、循環利率近20%，導致逼近80萬人陷入卡債，其中約52萬人連6個月最低應繳都付不出；2006年底協商22萬餘件、平均每件144萬元。",
        "institutional_aftermath": "促成立法院於2007年三讀、2008年4月施行《消費者債務清理條例》，首度建立平民「更生／清算」的個人破產重啟機制。",
        "gameplay_impact": {
          "trigger_decision": "D14_financial_trap",
          "unlock_switch_2008": "consumer_debt_clearance"
        },
        "sensitive": false,
        "cultural_footnote_en": "Predatory credit and cash cards trapped nearly 800,000 Taiwanese in high-interest debt, resulting in Taiwan's first personal bankruptcy/debt-clearance law in 2008.",
        "sources": [
          "公視新聞",
          "台大論文"
        ],
        "protagonist_involvement": {
          "base_prob": 0.12,
          "regions": [
            "ALL"
          ],
          "age_range": [
            20,
            50
          ],
          "trait_mult": {
            "risk_taker": 2.2,
            "sociable": 1.5,
            "cautious": 0.2
          },
          "exp_tags": [
            "low_quintile"
          ],
          "outcomes": [
            {
              "weight": 1.0,
              "severity": "economic_severe",
              "narrative": "你為周轉生活費辦了多張現金卡與信用卡以卡養卡，近 20% 循環利息滾成百萬卡債陷入「卡奴」困境，直到 2008 消債條例上路才得以更生。",
              "money_ratio_delta": -0.8,
              "extra_debt_2025": 1100000,
              "happiness_delta": -28,
              "heavy_debt": true
            }
          ]
        }
      },
      {
        "id": "EV_2007_rebar_scandal",
        "year": 2007,
        "year_end": 2007,
        "category": "finance",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "力霸東森掏空案",
        "summary": "王又曾家族涉長期掏空詐貸集團旗下事業（檢方偵辦起訴規模逾700億元、法院認定逾320億元），引爆中華商銀擠兌風暴，王家7名子女判刑定讞。",
        "institutional_aftermath": "暴露跨業集團交叉持股與監理漏洞，促使金管會強化大股東適格性審查、關係人交易揭露與實質受益人規範。",
        "gameplay_impact": {
          "narrative_only": true,
          "financial_trust_delta": -3
        },
        "sensitive": false,
        "cultural_footnote_en": "The collapse of the Rebar conglomerate sparked a bank run at Chinese Bank and tightened oversight of conglomerate cross-holdings in Taiwan.",
        "sources": [
          "司法院判決與金管會史料"
        ]
      },
      {
        "id": "EV_2008_2009_gfc_22k_morakot",
        "year": 2008,
        "year_end": 2009,
        "category": "finance_disaster",
        "regions": [
          "ALL",
          "south_kaohsiung",
          "south_tainan"
        ],
        "title": "金融海嘯、22K 方案與莫拉克八八風災",
        "summary": "2008年雷曼連動債釀台灣約10萬人受害、台股跌57.7%；2009年失業率飆至5.85%（8月達6.13%歷史新高）、政府推月薪22K實習方案；同年8月莫拉克颱風釀681死、小林村滅村。",
        "institutional_aftermath": "22K成為世代低薪代名詞；八八風災大幅推動原鄉防災撤離與土石流警戒系統升級。",
        "gameplay_impact": {
          "stock_return_2008": -0.577,
          "trigger_decision_job": "D10_unpaid_leave",
          "trigger_decision_south": "D22_major_disaster"
        },
        "sensitive": true,
        "cultural_footnote_en": "A brutal double hit: the 2008–09 financial crisis anchored fresh-grad pay around NT$22K ('22K generation'), while Typhoon Morakot buried Xiaolin Village in southern Taiwan.",
        "sources": [
          "今周刊",
          "中央銀行年報",
          "遠見",
          "聯合報",
          "監察院"
        ],
        "impact_regions": [
          "south_kaohsiung",
          "south_tainan"
        ],
        "disaster_year": 2009,
        "protagonist_involvement": {
          "base_prob": 0.13,
          "regions": [
            "south_kaohsiung",
            "south_tainan",
            "ALL"
          ],
          "age_range": [
            18,
            75
          ],
          "trait_mult": {
            "risk_taker": 1.8,
            "family_first": 1.3
          },
          "exp_tags": [
            "has_savings",
            "homeowner"
          ],
          "outcomes": [
            {
              "weight": 0.62,
              "severity": "economic_major",
              "narrative": "銀行理專推銷的雷曼連動債一夕歸零加上金融海嘯裁員，你的退休金與積蓄腰斬，被迫大幅縮衣節食。",
              "money_ratio_delta": -0.55,
              "stock_ratio_delta": -0.55,
              "job_lost": true,
              "happiness_delta": -24
            },
            {
              "weight": 0.26,
              "severity": "disaster_relocate",
              "narrative": "莫拉克八八風災三天降下整年雨量，南台灣家園遭洪水與土石流沖毀，你成為災民被迫異地安置重建。",
              "lose_home": true,
              "money_ratio_delta": -0.45,
              "happiness_delta": -26,
              "force_relocate": true
            },
            {
              "weight": 0.12,
              "severity": "fatal",
              "narrative": "莫拉克颱風引發大規模山崩與土石流深夜沖毀家園，你在八八風災中不幸罹難。",
              "fatal": true,
              "death_cause": "2009 年莫拉克颱風（八八風災土石流）"
            }
          ]
        }
      },
      {
        "id": "EV_2011_2014_food_safety_storms",
        "year": 2011,
        "year_end": 2014,
        "category": "society_food_safety",
        "regions": [
          "ALL"
        ],
        "title": "塑化劑、毒澱粉與黑心油食安連環爆",
        "summary": "2011年爆發起雲劑違法添加塑化劑，接續2013年毒澱粉與2014年劣質餿水油／飼料油風暴，波及全台飲食供應鏈。",
        "institutional_aftermath": "立法院多次大修《食品安全衛生管理法》重罰刑責、建立食品雲與追溯追蹤系統，並於2014年底成立行政院食品安全辦公室。",
        "gameplay_impact": {
          "health_delta": -2,
          "happiness_delta": -3,
          "food_traceability_improved_after": true
        },
        "sensitive": false,
        "cultural_footnote_en": "Successive scandals involving plasticizers (2011) and gutter oil (2014) led to strict food-traceability laws and harsh criminal penalties.",
        "sources": [
          "衛福部食藥署法制沿革"
        ]
      },
      {
        "id": "EV_2013_hung_chungchiu",
        "year": 2013,
        "year_end": 2013,
        "category": "crime_society",
        "regions": [
          "north_hsinchu",
          "ALL"
        ],
        "title": "洪仲丘事件與白衫軍運動",
        "summary": "義務役下士洪仲丘於退伍前夕疑遭不當禁閉操練致死，引發25萬名民眾走上凱道抗議。",
        "institutional_aftermath": "促成《軍事審判法》歷史性修法，承平時期現役軍人涉案全面回歸普通法院依《刑事訴訟法》審理，終結承平軍法黑箱。",
        "gameplay_impact": {
          "unlock_switch": "military_trial_reform",
          "military_abuse_risk_mult_after": 0.3
        },
        "sensitive": true,
        "cultural_footnote_en": "The 2013 death of conscript Hung Chung-chiu sparked a 250,000-person protest that abolished peacetime military courts in Taiwan.",
        "sources": [
          "立法院軍事審判法修法紀錄"
        ],
        "protagonist_involvement": {
          "base_prob": 0.15,
          "regions": [
            "ALL"
          ],
          "age_range": [
            19,
            25
          ],
          "trait_mult": {
            "civic_minded": 2.4,
            "workaholic": 1.3
          },
          "exp_tags": [
            "in_military"
          ],
          "outcomes": [
            {
              "weight": 1.0,
              "severity": "trajectory",
              "narrative": "你服役期間親身見證軍中不當管教文化，退伍後毅然站上凱道加入 25 萬人白衫軍運動，促成《軍事審判法》修法成為人生重要轉折。",
              "happiness_delta": -4,
              "knowledge_delta": 8,
              "social_delta": 10
            }
          ]
        }
      },
      {
        "id": "EV_2014_2016_random_attacks_safety_net",
        "year": 2014,
        "year_end": 2016,
        "category": "crime_society",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "台北捷運隨機殺人案（2014）與內湖小燈泡命案（2016）",
        "summary": "2014年北捷板南線隨機襲擊釀4死20餘傷；2016年內湖4歲女童遇害，引發全台對無差別暴力與精神衛生資源的高度焦慮。",
        "institutional_aftermath": "強化大眾運輸安全機制，並促使政府啟動跨部會「強化社會安全網」計畫（衛政結合社政追蹤高風險個案），深化被害人保護與司法對話。",
        "gameplay_impact": {
          "happiness_delta_north_taipei": -3,
          "social_safety_net_level": 1
        },
        "sensitive": true,
        "cultural_footnote_en": "High-profile random attacks in 2014 and 2016 prompted Taiwan's cross-ministry 'Strengthening the Social Safety Net' mental-health and social-work initiative.",
        "sources": [
          "衛福部強化社會安全網計畫"
        ],
        "protagonist_involvement": {
          "base_prob": 0.06,
          "regions": [
            "north_taipei"
          ],
          "age_range": [
            15,
            65
          ],
          "trait_mult": {
            "workaholic": 1.3,
            "sociable": 1.3,
            "sensitive_introvert": 1.4
          },
          "exp_tags": [],
          "outcomes": [
            {
              "weight": 0.85,
              "severity": "trauma",
              "narrative": "你搭乘板南線捷運時恰巧身處相鄰車廂，經歷人群驚慌逃散的驚魂瞬間，此後長期搭車保持高度戒備並更加關注台灣社會安全網議題。",
              "happiness_delta": -18,
              "health_delta": -6
            },
            {
              "weight": 0.15,
              "severity": "injury_trauma",
              "narrative": "你在雙北公共空間突發無差別暴力事件中受波及受傷，歷經醫療與心理諮商才逐步重返日常。",
              "health_delta": -24,
              "happiness_delta": -25,
              "money_ratio_delta": -0.1
            }
          ]
        }
      },
      {
        "id": "EV_2014_kaohsiung_gas_explosion",
        "year": 2014,
        "year_end": 2014,
        "category": "society_safety",
        "regions": [
          "south_kaohsiung"
        ],
        "title": "高雄前鎮苓雅氣爆事故",
        "summary": "7月31日深夜高雄市地下丙烯管線外洩引發6公里連環爆炸，造成32人罹難、逾300人輕重傷。",
        "institutional_aftermath": "揭開重工業城市地下石化管線與住宅區共生的歷史共業，促成高雄訂定既有工業管線自治條例並加速城市產業轉型。",
        "gameplay_impact": {
          "happiness_delta_region": -5,
          "narrative_tag": "kaohsiung_industrial_transition"
        },
        "sensitive": true,
        "cultural_footnote_en": "Underground petrochemical pipelines exploded across 6 km of residential streets in Kaohsiung, forcing strict industrial-pipeline regulation and urban renewal.",
        "sources": [
          "高雄市政府與監察院調查報告"
        ],
        "protagonist_involvement": {
          "base_prob": 0.1,
          "regions": [
            "south_kaohsiung"
          ],
          "age_range": [
            12,
            80
          ],
          "trait_mult": {
            "sociable": 1.5,
            "workaholic": 1.4
          },
          "exp_tags": [],
          "outcomes": [
            {
              "weight": 0.65,
              "severity": "economic_injury",
              "narrative": "深夜前鎮苓雅地下丙烯管線連環氣爆就在住家與通勤幹道旁，你遭氣浪波及受傷、房屋與交通工具全毀，災後重建耗盡積蓄。",
              "health_delta": -22,
              "money_ratio_delta": -0.35,
              "happiness_delta": -22
            },
            {
              "weight": 0.22,
              "severity": "trauma",
              "narrative": "你剛騎車經過凱旋三路幾分鐘後路面就轟然炸開，與死神擦肩而過讓你久久難以平復。",
              "happiness_delta": -16
            },
            {
              "weight": 0.13,
              "severity": "fatal",
              "narrative": "深夜行經高雄氣爆路段時遭遇地下石化管線連環爆炸，不幸罹難。",
              "fatal": true,
              "death_cause": "2014 年高雄地下丙烯管線氣爆事故"
            }
          ]
        }
      },
      {
        "id": "EV_2015_transasia_formosa_fun_coast",
        "year": 2015,
        "year_end": 2015,
        "category": "accident",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "復興航空 235 空難與八仙樂園粉塵爆炸",
        "summary": "2015年2月復興航空班機墜入基隆河釀43死；6月八仙樂園彩色派對粉塵爆炸釀15死、484人燒燙傷，為921後傷者最多的單一意外。",
        "institutional_aftermath": "全面禁止大型活動使用可燃性微細粉末，並大幅提升大型燒燙傷急救跨院調度能力。",
        "gameplay_impact": {
          "youth_accident_alert_2015": true
        },
        "sensitive": true,
        "cultural_footnote_en": "The 2015 Formosa Fun Coast color-powder explosion injured 484 young people, leading to a nationwide ban on flammable powder at public events.",
        "sources": [
          "三立新聞",
          "鏡週刊"
        ],
        "protagonist_involvement": {
          "base_prob": 0.08,
          "regions": [
            "north_taipei",
            "north_hsinchu"
          ],
          "age_range": [
            16,
            30
          ],
          "trait_mult": {
            "sociable": 2.6,
            "risk_taker": 1.5,
            "sensitive_introvert": 0.25,
            "cautious": 0.4
          },
          "exp_tags": [],
          "outcomes": [
            {
              "weight": 0.8,
              "severity": "injury_trajectory",
              "narrative": "你在八仙樂園參加夏日派對時遭遇粉塵爆燃，大面積燒燙傷讓你住院與穿壓力衣復健長達數年，學業與職涯徹底被迫改道。",
              "health_delta": -32,
              "happiness_delta": -26,
              "money_ratio_delta": -0.3,
              "job_lost": true
            },
            {
              "weight": 0.2,
              "severity": "fatal",
              "narrative": "你在八仙樂園粉塵爆炸事故中遭受大面積嚴重燒燙傷，經數週搶救仍不幸離世。",
              "fatal": true,
              "death_cause": "2015 年八仙樂園粉塵爆炸意外"
            }
          ]
        }
      },
      {
        "id": "EV_2016_mega_bank_aml",
        "year": 2016,
        "year_end": 2016,
        "category": "finance",
        "regions": [
          "ALL"
        ],
        "title": "兆豐銀行紐約分行洗錢防制裁罰案",
        "summary": "公股兆豐銀行紐約分行因違反美國反洗錢申報規範，遭美方重罰1.8億美元（約新台幣57億元）。",
        "institutional_aftermath": "迫使台灣大幅翻修《洗錢防制法》並全面收緊銀行KYC審查，助台灣於2018年通過APG國際評鑑；從此一般民眾開戶與匯款盤查顯著趨嚴。",
        "gameplay_impact": {
          "unlock_daily_flavor": "strict_bank_kyc_questions"
        },
        "sensitive": false,
        "cultural_footnote_en": "A US$180M anti-money-laundering fine against Mega Bank in NY triggered strict banking KYC checks that Taiwanese residents encounter at every bank counter today.",
        "sources": [
          "法務部與金管會洗錢防制修法資料"
        ]
      },
      {
        "id": "EV_2019_same_sex_marriage",
        "year": 2019,
        "year_end": 2019,
        "category": "politics_society",
        "regions": [
          "ALL"
        ],
        "title": "同性婚姻專法生效（亞洲第一）",
        "summary": "2019年5月24日《司法院釋字第七四八號解釋施行法》正式生效，台灣成為亞洲第一個同性婚姻合法化國家。",
        "institutional_aftermath": "保障同性伴侶結婚、財產繼承與後續收養權益，成為台灣人權指標里程碑。",
        "gameplay_impact": {
          "unlock_switch": "same_sex_marriage",
          "happiness_delta": 2
        },
        "sensitive": false,
        "cultural_footnote_en": "On May 24, 2019, Taiwan became the first country in Asia to legalize same-sex marriage.",
        "sources": [
          "報導者"
        ]
      },
      {
        "id": "EV_2020_2022_covid19",
        "year": 2020,
        "year_end": 2022,
        "category": "epidemic_economy",
        "regions": [
          "ALL"
        ],
        "title": "COVID-19 世紀疫情",
        "summary": "2020年台股一度跌30%後V轉、定存破1%；2021年三級警戒無薪假達31,980人（餐飲住宿最多）；2022年共存浪潮累計確診逾半數國人，2022年死亡14,667人使平均壽命減1.02歲。",
        "institutional_aftermath": "加速遠距辦公、數位轉型與外送經濟普及，也突顯台灣半導體在全球供應鏈的關鍵地位。",
        "gameplay_impact": {
          "trigger_decision": "D23_pandemic_dilemma",
          "elderly_mortality_mult_2022": 1.15
        },
        "sensitive": true,
        "cultural_footnote_en": "Taiwan kept COVID-19 largely at bay through 2020–21 before a major Omicron wave in 2022 temporarily lowered national life expectancy by 1.02 years.",
        "sources": [
          "數位時代",
          "台灣英文新聞",
          "鏡週刊",
          "中央社"
        ]
      },
      {
        "id": "EV_2021_taroko_408",
        "year": 2021,
        "year_end": 2024,
        "category": "society_safety",
        "regions": [
          "east_islands",
          "ALL"
        ],
        "title": "台鐵太魯閣號 408 車次出軌事故",
        "summary": "2021年4月2日清明連假返鄉列車於花蓮清水隧道口撞上滑落邊坡工程車，造成49人罹難、逾200人輕重傷。",
        "institutional_aftermath": "打破長年改革阻力，促成台鐵於2024年1月正式掛牌「台鐵公司化」，並全面建置邊坡預警監測系統。",
        "gameplay_impact": {
          "happiness_delta_east": -6,
          "narrative_tag": "safe_way_home_east"
        },
        "sensitive": true,
        "cultural_footnote_en": "A 2021 train derailment in Hualien killed 49 holiday travelers, finally pushing Taiwan Railways to corporatize in January 2024 to overhaul safety.",
        "sources": [
          "運安會調查報告",
          "交通部台鐵公司化資料"
        ],
        "protagonist_involvement": {
          "base_prob": 0.11,
          "regions": [
            "east_islands",
            "north_taipei"
          ],
          "age_range": [
            16,
            70
          ],
          "trait_mult": {
            "family_first": 2.2,
            "sociable": 1.4
          },
          "exp_tags": [
            "east_origin_or_resident"
          ],
          "outcomes": [
            {
              "weight": 0.78,
              "severity": "injury_trauma",
              "narrative": "清明連假你搭上返鄉的台鐵太魯閣號 408 車次，在清水隧道口劇烈撞擊中受傷倖存，深刻體會東部人「一條安全回家路」的沉痛渴望。",
              "health_delta": -24,
              "happiness_delta": -24,
              "money_ratio_delta": -0.1
            },
            {
              "weight": 0.22,
              "severity": "fatal",
              "narrative": "清明連假返鄉途中搭乘太魯閣號 408 車次，於花蓮清水隧道口撞擊工程車出軌事故中不幸罹難。",
              "fatal": true,
              "death_cause": "2021 年台鐵太魯閣號 408 車次出軌事故"
            }
          ]
        }
      },
      {
        "id": "EV_2022_2025_scam_wave_and_imb",
        "year": 2022,
        "year_end": 2025,
        "category": "crime_finance",
        "regions": [
          "ALL"
        ],
        "title": "數位投資詐騙浪潮、台版柬埔寨案與 im.B 吸金案",
        "summary": "跨國假求職與假投資詐騙氾濫，爆發台版柬埔寨人頭戶拘禁案與2023年im.B假債權吸金逾25億元（逾5,000人受害）；2025年全台詐騙受理16.2萬件、財損近900億元。",
        "institutional_aftermath": "立法院於2024年7月三讀通過「打詐新四法」，重懲高額詐欺、強化科技偵查並限制人頭帳戶金融權限。",
        "gameplay_impact": {
          "trigger_decision": "D14_financial_trap",
          "unlock_switch_2024": "anti_fraud_4_acts"
        },
        "sensitive": true,
        "cultural_footnote_en": "Annual scam losses nearing NT$90B prompted Taiwan's 2024 'Four Anti-Fraud Acts,' dramatically raising penalties and bank withdrawal verifications.",
        "sources": [
          "股感",
          "TVBS",
          "法務部打詐新四法"
        ],
        "protagonist_involvement": {
          "base_prob": 0.14,
          "regions": [
            "ALL"
          ],
          "age_range": [
            22,
            78
          ],
          "trait_mult": {
            "risk_taker": 2.5,
            "cautious": 0.25,
            "sensitive_introvert": 1.3
          },
          "exp_tags": [
            "has_savings"
          ],
          "outcomes": [
            {
              "weight": 0.7,
              "severity": "economic_severe",
              "narrative": "你落入精密設計的假投資平台／im.B 假債權陷阱，甚至聽信專員借信貸加碼，驚覺無法出金報案 165 時，大半輩子積蓄已遭詐騙集團洗劫一空。",
              "money_ratio_delta": -0.78,
              "extra_debt_2025": 800000,
              "happiness_delta": -32,
              "heavy_debt": true
            },
            {
              "weight": 0.3,
              "severity": "economic_major",
              "narrative": "你在 LINE 飆股群組投入一筆退休預備金遭到詐騙，雖在行員關懷提問下及時攔阻第二筆匯款，仍蒙受重大財損。",
              "money_ratio_delta": -0.35,
              "happiness_delta": -18
            }
          ]
        }
      },
      {
        "id": "EV_2023_2025_kaikai_case",
        "year": 2023,
        "year_end": 2025,
        "category": "crime_society",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "剴剴虐童案與《刑法》修法",
        "summary": "2023年底台北1歲男童在出養等待期間遭保母凌虐致死，暴露跨縣市社福訪視斷裂；2025年5月國民法官法庭判處主嫌無期徒刑。",
        "institutional_aftermath": "引發大規模公民檢討托育社安網；立法院於2025年7月18日三讀通過「剴剴條款」（增訂刑法第272條之1、修正第286條），明定凌虐未滿7歲幼童致死最重可判死刑。",
        "gameplay_impact": {
          "childcare_anxiety_delta": 3,
          "narrative_tag": "citizen_judges_era"
        },
        "sensitive": true,
        "cultural_footnote_en": "A fatal child-abuse case tried under Taiwan's new Citizen Judges system led to 2025 penal code amendments imposing severe penalties for lethal child abuse.",
        "sources": [
          "司法院國民法官判決",
          "立法院刑法修法紀錄"
        ]
      },
      {
        "id": "EV_2023_metoo_taiwan",
        "year": 2023,
        "year_end": 2024,
        "category": "society_rights",
        "regions": [
          "ALL"
        ],
        "title": "台灣 #MeToo 浪潮與性平三法修法",
        "summary": "2023年中起由政壇延燒至演藝、媒體、學界與職場的集體性騷擾揭露運動，打破多年職場沉默文化。",
        "institutional_aftermath": "立法院於2023年7月火速修訂「性平三法」並於2024年3月8日全面上路，加重權勢性騷刑責與雇主防治義務。",
        "gameplay_impact": {
          "unlock_switch_2024": "gender_equality_3_acts",
          "workplace_harassment_protection": true
        },
        "sensitive": true,
        "cultural_footnote_en": "Taiwan's 2023 #MeToo wave swept politics, media, and workplaces, prompting sweeping amendments to three gender-equality laws effective March 2024.",
        "sources": [
          "勞動部與衛福部性平三法專區"
        ]
      },
      {
        "id": "EV_2024_hualien_quake_housing_peak",
        "year": 2024,
        "year_end": 2024,
        "category": "disaster_economy",
        "regions": [
          "east_islands",
          "ALL"
        ],
        "title": "0403 花蓮規模 7.2 強震與房價所得比創高",
        "summary": "4月3日花蓮發生規模7.2強震（當日至少9死963傷、重創東部觀光與太魯閣）；同年第三季全國房價所得比達10.82倍歷史高點。",
        "institutional_aftermath": "展現921後建築耐震升級的減災成效，同時凸顯居住負擔與東部交通韌性課題。",
        "gameplay_impact": {
          "trigger_decision_east": "D22_major_disaster",
          "housing_burden_peak": true
        },
        "sensitive": false,
        "cultural_footnote_en": "An M7.2 quake struck Hualien in April 2024—causing far fewer deaths than 1999 thanks to upgraded building codes—while housing affordability hit a record low.",
        "sources": [
          "上報",
          "自由時報"
        ],
        "impact_regions": [
          "east_islands"
        ],
        "disaster_year": 2024,
        "protagonist_involvement": {
          "base_prob": 0.14,
          "regions": [
            "east_islands"
          ],
          "age_range": [
            0,
            90
          ],
          "trait_mult": {
            "family_first": 1.2
          },
          "exp_tags": [
            "homeowner",
            "tourism_sector"
          ],
          "outcomes": [
            {
              "weight": 0.75,
              "severity": "economic_housing",
              "narrative": "0403 花蓮 7.2 強震震毀你的住家或任職旅宿，蘇花與太魯閣中斷讓東部觀光重挫，你面臨無薪假與紅單危樓重建雙重打擊。",
              "lose_home": true,
              "money_ratio_delta": -0.35,
              "job_lost": true,
              "happiness_delta": -20
            },
            {
              "weight": 0.18,
              "severity": "injury",
              "narrative": "強震發生時你在東部山區通勤遭落石擦傷，所幸獲救但留下長期陰影。",
              "health_delta": -18,
              "happiness_delta": -16
            },
            {
              "weight": 0.07,
              "severity": "fatal",
              "narrative": "0403 花蓮規模 7.2 強震襲擊時行經落石路段，不幸於強震中罹難。",
              "fatal": true,
              "death_cause": "2024 年 0403 花蓮規模 7.2 強震"
            }
          ]
        }
      },
      {
        "id": "EV_2025_2026_super_aged_ai_tariff",
        "year": 2025,
        "year_end": 2026,
        "category": "economy_society_disaster",
        "regions": [
          "ALL",
          "central",
          "east_islands"
        ],
        "title": "超高齡社會、AI 出口狂潮、對等關稅與光復洪災",
        "summary": "2025年台灣65+人口達20.06%正式進入超高齡社會、總生育率跌至0.695；8月美對台20%關稅致傳產無薪假8,543人（2026年1月降為15%），9月樺加沙颱風致花蓮光復鄉19死；但AI帶動2025經濟成長7.37%，2026年10月台股逼近5萬點（49,968.92點），中華大學於2026年停招。",
        "institutional_aftermath": "形成科技業財富效應與傳產減班、少子高齡化並存的「K型台灣」時代面貌。",
        "gameplay_impact": {
          "tech_wage_bonus": 1.15,
          "trad_mfg_unpaid_leave_prob": 0.08,
          "elderly_care_trigger_mult": 1.5,
          "private_uni_closure_prob": 0.05
        },
        "sensitive": false,
        "cultural_footnote_en": "By 2025–26, Taiwan entered a 'super-aged' society (over 20% aged 65+) with the world's lowest fertility, even as an AI semiconductor boom drove stocks near 50,000 points.",
        "sources": [
          "聯合報",
          "公視新聞",
          "天下雜誌",
          "科技新報",
          "優分析",
          "關鍵評論網",
          "遠見",
          "工商時報"
        ],
        "impact_regions": [
          "east_islands"
        ],
        "disaster_year": 2025
      }
    ]
  },
  "decisions": {
    "meta": {
      "schema_version": "1.0.0",
      "total_decisions": 29,
      "design_principle": "選項僅改變後續機率與參數權重，不保證單一結果；支援一卡多年代變體（era_variants）。"
    },
    "pause_questions": [
      {
        "age": 5,
        "question_zh": "如果可以重選，你會希望自己出生在台灣的哪一個縣市、哪一個年代？",
        "theme": "birth_lottery"
      },
      {
        "age": 15,
        "question_zh": "你在 15 歲時最煩惱的是升學考試、零用錢，還是家裡的氣氛？",
        "theme": "adolescence_exams"
      },
      {
        "age": 30,
        "question_zh": "站在 30 歲這年，你覺得現在過的是自己想要的人生，還是長輩與社會期待的範本？",
        "theme": "thirty_expectations"
      },
      {
        "age": 50,
        "question_zh": "當父母漸漸老去、身體開始出現紅字，你現在最想對 20 年前的自己說什麼？",
        "theme": "sandwich_generation"
      },
      {
        "age": 70,
        "question_zh": "回望這一生經歷過的台灣變遷，哪一個微小的日常片刻最讓你捨不得放下？",
        "theme": "life_reflection"
      }
    ],
    "decisions": [
      {
        "id": "D01_junior_high_track",
        "stage": "education",
        "title": "國中畢業分流",
        "conditions": {
          "age": 15
        },
        "options": [
          {
            "key": "general_high",
            "label": "念普通高中拚大學",
            "effects": {
              "knowledge": 8,
              "money_delta_ratio": -0.05,
              "track": "academic"
            }
          },
          {
            "key": "vocational",
            "label": "念高職或五專學一技之長",
            "effects": {
              "knowledge": 4,
              "early_job_ready": true,
              "track": "vocational"
            }
          },
          {
            "key": "apprentice",
            "label": "直接進工廠當學徒或打工貼補家用",
            "effects": {
              "money_delta_ratio": 0.08,
              "knowledge": -4,
              "max_edu_cap": "junior_high",
              "track": "labor"
            }
          }
        ],
        "deprecated_by": "LS02_junior_high_exam_branch"
      },
      {
        "id": "D02_university_major",
        "stage": "education",
        "title": "大學選系抉擇",
        "conditions": {
          "age": 18,
          "requires": "admitted_to_university"
        },
        "options": [
          {
            "key": "stem_med",
            "label": "電資／工程／醫藥衛生學門",
            "effects": {
              "starting_pay_mult": 1.13,
              "unlock_careers": [
                "tech_semi",
                "medical"
              ],
              "happiness": -3
            }
          },
          {
            "key": "humanities_biz",
            "label": "商管／文史／藝術學門",
            "effects": {
              "happiness": 4,
              "starting_pay_mult": 1.0,
              "private_uni_closure_risk_after_2022": 0.06
            }
          },
          {
            "key": "public_funded",
            "label": "軍警校或公費師範體系",
            "effects": {
              "tuition_free": true,
              "unlock_careers": [
                "civil_servant_teacher_military"
              ],
              "job_stability": 0.99
            }
          }
        ]
      },
      {
        "id": "D03_exam_retake",
        "stage": "education",
        "title": "落榜或不滿意志願",
        "conditions": {
          "age_range": [
            18,
            19
          ],
          "requires": "missed_target_school"
        },
        "options": [
          {
            "key": "cram_school",
            "label": "蹲重考班一年再戰",
            "effects": {
              "money_delta_ratio": -0.1,
              "happiness": -8,
              "knowledge": 10,
              "top_uni_prob_bonus": 0.25
            }
          },
          {
            "key": "transfer_or_grad",
            "label": "先入學，日後再拚轉學考或洗研究所",
            "effects": {
              "knowledge": 3,
              "happiness": -1
            }
          },
          {
            "key": "work_or_military",
            "label": "直接就業或先去當兵",
            "effects": {
              "early_work_years": 1,
              "knowledge": -2
            }
          }
        ]
      },
      {
        "id": "D04_military_service",
        "stage": "education",
        "title": "男性兵役路徑",
        "conditions": {
          "age_range": [
            19,
            24
          ],
          "sex": "M"
        },
        "options": [
          {
            "key": "conscription",
            "label": "一般義務役抽籤入伍",
            "effects": {
              "health": 5,
              "relationship_breakup_prob_if_long": 0.22
            }
          },
          {
            "key": "rd_substitute",
            "label": "申請研發替代役或預官",
            "requires_edu": "master_or_stem",
            "effects": {
              "career_gap_months": 0,
              "tech_entry_bonus": 0.3
            },
            "era_labels": [
              {
                "max_year": 1999,
                "label": "報考預官／預士（高學歷幹部路徑）"
              },
              {
                "min_year": 2000,
                "max_year": 2007,
                "label": "申請國防役／替代役或報考預官"
              },
              {
                "min_year": 2008,
                "label": "申請研發替代役或預官（銜接科技研發）"
              }
            ]
          },
          {
            "key": "volunteer_soldier",
            "label": "簽志願役",
            "effects": {
              "starting_pay_mult": 1.2,
              "savings_rate_bonus": 0.15,
              "happiness": -4
            }
          }
        ]
      },
      {
        "id": "D05_graduation_crossroads",
        "stage": "education",
        "title": "畢業路口：就業或深造",
        "conditions": {
          "age": 22,
          "requires": "university_grad"
        },
        "options": [
          {
            "key": "domestic_master",
            "label": "考國內研究所（2年）",
            "effects": {
              "income_years_zero": 2,
              "long_term_wage_mult": 1.45,
              "knowledge": 10
            }
          },
          {
            "key": "study_abroad",
            "label": "出國留學（需Q4–Q5資源或學貸）",
            "effects": {
              "money_delta_ratio": -0.45,
              "unlock_overseas_career": true,
              "long_term_wage_mult": 1.6
            }
          },
          {
            "key": "direct_work",
            "label": "直接進入職場",
            "effects": {
              "early_work_years": 2,
              "era_2009_22k_risk": 0.45
            }
          }
        ]
      },
      {
        "id": "D06_northbound_migration",
        "stage": "career",
        "title": "北漂還是留鄉？",
        "conditions": {
          "age_range": [
            22,
            26
          ],
          "region_not_in": [
            "north_taipei",
            "north_hsinchu"
          ]
        },
        "options": [
          {
            "key": "move_north",
            "label": "北漂雙北或赴桃竹苗科學園區打拚",
            "effects": {
              "migrate_to": [
                "north_taipei",
                "north_hsinchu"
              ],
              "wage_mult": 1.25,
              "rent_cost_mult": 2.2,
              "relationships": -6
            }
          },
          {
            "key": "stay_home",
            "label": "留在家鄉工作並住家裡",
            "effects": {
              "rent_cost_mult": 0.2,
              "relationships": 6,
              "happiness": 4,
              "career_ceiling_local": true
            }
          }
        ]
      },
      {
        "id": "D07_career_track",
        "stage": "career",
        "title": "職涯跑道選擇",
        "conditions": {
          "age_range": [
            24,
            35
          ]
        },
        "options": [
          {
            "key": "tech_finance",
            "label": "進科技大廠或金融保險業",
            "effects": {
              "wage_mult": 1.45,
              "health": -6,
              "work_hours_high": true
            }
          },
          {
            "key": "civil_service",
            "label": "全職備考高普考／國營事業",
            "effects": {
              "exam_prep_years": 1,
              "pass_prob_base": 0.25,
              "layoff_prob_if_pass": 0.0
            }
          },
          {
            "key": "family_biz_startup",
            "label": "接家業或創業當頭家",
            "effects": {
              "wage_variance_high": true,
              "tariff_wto_exposure": true,
              "region_bonus": [
                "central",
                "south_tainan"
              ]
            }
          }
        ]
      },
      {
        "id": "D08_overseas_assignment",
        "stage": "career",
        "title": "跨海工作邀約",
        "conditions": {
          "age_range": [
            26,
            45
          ]
        },
        "era_variants": [
          {
            "variant_id": "china_taigan",
            "year_range": [
              1990,
              2016
            ],
            "label_context": "西進中國擔任台幹（2012高峰43萬人）"
          },
          {
            "variant_id": "us_jp_fab",
            "year_range": [
              2020,
              2035
            ],
            "label_context": "赴美國亞利桑那或日本熊本廠外派"
          }
        ],
        "options": [
          {
            "key": "accept_expat",
            "label": "接受外派領海外加給",
            "effects": {
              "wage_mult": 1.7,
              "relationships": -10,
              "marital_strain_prob": 0.2
            }
          },
          {
            "key": "decline_stay",
            "label": "婉拒外派留在台灣陪伴家人",
            "effects": {
              "relationships": 5,
              "happiness": 3
            }
          }
        ]
      },
      {
        "id": "D09_return_hometown_dilemma",
        "stage": "career",
        "title": "北漂十年的返鄉掙扎",
        "conditions": {
          "age_range": [
            32,
            44
          ],
          "requires_flag": "migrated_north"
        },
        "options": [
          {
            "key": "stay_north",
            "label": "咬牙留北打拚（保薪資與醫療學區）",
            "effects": {
              "happiness": -4,
              "relationships": -4
            }
          },
          {
            "key": "return_home",
            "label": "返鄉就業或轉遠距照顧家人",
            "effects": {
              "migrate_to": "birth_region",
              "wage_mult": 0.8,
              "rent_cost_mult": 0.4,
              "happiness": 8,
              "relationships": 10
            }
          }
        ]
      },
      {
        "id": "D10_unpaid_leave",
        "stage": "career",
        "title": "景氣寒冬與無薪假",
        "conditions": {
          "age_range": [
            25,
            55
          ],
          "trigger_years": [
            2009,
            2020,
            2021,
            2025
          ]
        },
        "options": [
          {
            "key": "gig_side_job",
            "label": "配合減班休息，下班兼差補貼家用",
            "effects": {
              "income_retention": 0.75,
              "health": -8,
              "happiness": -5
            },
            "era_labels": [
              {
                "max_year": 2018,
                "label": "配合減班休息＋兼差打工、接案或擺攤補貼家用"
              },
              {
                "min_year": 2019,
                "label": "配合減班休息＋兼差（如跑外送或接案）"
              }
            ]
          },
          {
            "key": "resign_retrain",
            "label": "離職轉行或參加職訓",
            "effects": {
              "income_gap_months": 4,
              "sector_switch": true
            }
          },
          {
            "key": "borrow_credit",
            "label": "刷卡或信貸周轉撐過景氣谷底",
            "effects": {
              "debt_added_ratio": 0.35,
              "debt_trap_flag": true
            }
          }
        ]
      },
      {
        "id": "D11_health_red_flags",
        "stage": "career",
        "title": "健檢紅字與職場過勞",
        "conditions": {
          "age_range": [
            35,
            55
          ],
          "health_below": 60
        },
        "options": [
          {
            "key": "slow_down",
            "label": "降薪換準時下班、規律運動與定期健檢",
            "effects": {
              "wage_mult": 0.8,
              "health": 18,
              "midlife_mortality_mult": 0.75
            }
          },
          {
            "key": "keep_grinding",
            "label": "趁還能拚繼續加班領分紅",
            "effects": {
              "bonus_ratio": 0.15,
              "health": -12,
              "midlife_mortality_mult": 1.35
            }
          }
        ]
      },
      {
        "id": "D12_first_pot_of_gold",
        "stage": "finance",
        "title": "第一桶金的配置",
        "conditions": {
          "age_range": [
            23,
            50
          ],
          "min_assets_twd_2025": 300000
        },
        "options": [
          {
            "key": "time_deposit",
            "label": "銀行定存或儲蓄險（依當年代利率計算）",
            "effects": {
              "invest_style": "deposit",
              "volatility": 0.01
            }
          },
          {
            "key": "etf_dca",
            "label": "定期定額投資台股大盤",
            "effects": {
              "invest_style": "index_etf",
              "long_term_return_bonus": 0.07
            },
            "era_labels": [
              {
                "max_year": 2002,
                "label": "定期買進台股大型權值股或開放式共同基金"
              },
              {
                "min_year": 2003,
                "label": "定期定額台股大盤 ETF（如 0050）"
              }
            ]
          },
          {
            "key": "margin_speculation",
            "label": "融資槓桿／聽明牌重壓飆股",
            "effects": {
              "invest_style": "leverage",
              "crash_wipeout_prob": 0.65
            }
          }
        ]
      },
      {
        "id": "D13_buying_home",
        "stage": "finance",
        "title": "買房的終極算計",
        "conditions": {
          "age_range": [
            27,
            46
          ],
          "not_homeowner": true
        },
        "options": [
          {
            "key": "buy_core_40yr",
            "label": "咬牙買下蛋黃區自住房",
            "effects": {
              "homeowner": true,
              "mortgage_dti": 0.45,
              "inflation_hedge": true,
              "happiness": 6
            },
            "requires_home_afford": "core",
            "era_labels": [
              {
                "max_year": 1999,
                "label": "咬牙買蛋黃區（申辦 20 年期高利率銀行房貸）"
              },
              {
                "min_year": 2000,
                "max_year": 2022,
                "label": "咬牙買蛋黃區（扛起 30 年期首購房貸）"
              },
              {
                "min_year": 2023,
                "label": "咬牙買蛋黃區（搭配新青安扛 40 年房貸）"
              }
            ]
          },
          {
            "key": "buy_suburb",
            "label": "退居蛋白區以通勤換空間",
            "effects": {
              "homeowner": true,
              "mortgage_dti": 0.3,
              "health": -4
            },
            "requires_home_afford": "suburb"
          },
          {
            "key": "rent_and_invest",
            "label": "堅持租屋、把頭期款投入股市",
            "effects": {
              "homeowner": false,
              "liquid_invest_bonus": true,
              "elderly_rent_rejection_risk": 0.3
            }
          }
        ]
      },
      {
        "id": "D14_financial_trap",
        "stage": "finance",
        "title": "時代金融陷阱（一卡四劇本）",
        "conditions": {
          "age_range": [
            25,
            65
          ],
          "min_assets_twd_2025": 200000
        },
        "era_variants": [
          {
            "variant_id": "hongyuan_1988",
            "year_range": [
              1985,
              1989
            ],
            "title": "親友力推「鴻源機構」月息 4 分",
            "crash_year": 1990,
            "source_note": "街頭巷尾瘋傳地下投資公司月息 4 分，許多鄰居同事爭相跟進（風險與後果尚不明朗）"
          },
          {
            "variant_id": "dual_card_2005",
            "year_range": [
              2004,
              2006
            ],
            "title": "銀行瘋推「現金卡借錢真輕鬆」",
            "crash_year": 2006,
            "source_note": "各家銀行力推現金卡『借錢真輕鬆』，循環利息最高逼近 20%"
          },
          {
            "variant_id": "lehman_2007",
            "year_range": [
              2007,
              2008
            ],
            "title": "理專推薦「保本高息」雷曼連動債",
            "crash_year": 2008,
            "source_note": "銀行理專主打海外連動債『高配息、低波動』，吸引大批定存族解約轉買"
          },
          {
            "variant_id": "scam_2024",
            "year_range": [
              2022,
              2026
            ],
            "title": "飆股群組／im.B「保本高息」平台邀約",
            "crash_year": "immediate_or_next_year",
            "source_note": "通訊軟體飆股群組與高息債權平台盛行，主打穩賺不賠話術"
          }
        ],
        "options": [
          {
            "key": "all_in",
            "label": "把大半積蓄投進去，甚至借信貸加碼",
            "effects": {
              "invest_ratio": 0.75,
              "loss_prob_on_crash": 0.9,
              "happiness_on_crash": -35,
              "suicide_risk_mult_if_debt": 1.8
            }
          },
          {
            "key": "small_try",
            "label": "只拿一成閒錢試水溫",
            "effects": {
              "invest_ratio": 0.1,
              "loss_prob_on_crash": 0.9,
              "happiness_on_crash": -8
            }
          },
          {
            "key": "reject",
            "label": "天下沒有白吃的午餐，直接拒絕",
            "effects": {
              "happiness": -2,
              "knowledge": 2
            }
          }
        ],
        "once_per_era_variant": true
      },
      {
        "id": "D15_stock_crash_panic",
        "stage": "finance",
        "title": "台股崩盤大逃殺",
        "conditions": {
          "age_range": [
            22,
            70
          ],
          "has_stock_assets": true,
          "trigger_years": [
            1990,
            1997,
            2000,
            2008,
            2020,
            2025
          ]
        },
        "options": [
          {
            "key": "panic_sell",
            "label": "恐慌認賠停損出清",
            "effects": {
              "realize_loss": true,
              "happiness": -8
            }
          },
          {
            "key": "hold_diamond",
            "label": "刪 App 蓋牌續抱（結果依歷史年份分化）",
            "effects": {
              "hold_through_cycle": true
            }
          },
          {
            "key": "buy_the_dip",
            "label": "動用預備金進場抄底",
            "effects": {
              "buy_dip_ratio": 0.4,
              "cash_buffer_risk": true
            }
          }
        ]
      },
      {
        "id": "D16_relative_loan_guarantor",
        "stage": "finance",
        "title": "親友開口借錢或作保",
        "conditions": {
          "age_range": [
            28,
            60
          ]
        },
        "options": [
          {
            "key": "co_sign",
            "label": "義氣相挺借出大筆款項或當保人",
            "effects": {
              "relationships": 10,
              "default_bankruptcy_prob": 0.35
            }
          },
          {
            "key": "small_gift_no_guarantee",
            "label": "包一筆不用還的小額救急但拒絕作保",
            "effects": {
              "money_delta_ratio": -0.05,
              "relationships": 2
            }
          },
          {
            "key": "refuse",
            "label": "斷然拒絕守住防線",
            "effects": {
              "relationships": -8
            }
          }
        ]
      },
      {
        "id": "D17_critical_illness_cost",
        "stage": "finance",
        "title": "重大傷病的醫療費抉擇",
        "conditions": {
          "age_range": [
            30,
            75
          ],
          "requires": "major_illness_diagnosed"
        },
        "options": [
          {
            "key": "self_pay_advanced",
            "label": "動用存款選用自費標靶藥／先進療程（復原最佳、大幅壓低致死與失能風險）",
            "requires_med_afford": true,
            "effects": {
              "cost_ratio_pre_1995": 0.85,
              "cost_ratio_post_1995": 0.25,
              "survival_bonus": 0.35
            }
          },
          {
            "key": "sell_home_for_med",
            "label": "存款不夠——忍痛賣房變現籌措救命自費療程（僅有房者可選）",
            "requires_homeowner_for_med": true,
            "effects": {
              "sell_home_medical": true,
              "survival_bonus": 0.3,
              "happiness": -10
            }
          },
          {
            "key": "standard_nhi",
            "label": "無力負擔自費，改採基礎保守治療（存款拮据時有殘疾失能與病情惡化早逝風險）",
            "effects": {
              "cost_ratio_pre_1995": 0.35,
              "cost_ratio_post_1995": 0.05,
              "inadequate_med_risk": true
            },
            "era_labels": [
              {
                "max_year": 1994,
                "label": "無力負擔昂貴全額療程，改採基礎保守治療（缺乏公辦全民醫療保險，失能與惡化風險極高）"
              },
              {
                "min_year": 1995,
                "label": "改採全民健保基礎給付治療（省下龐大自費，但仍有殘疾與復發風險）"
              }
            ]
          }
        ]
      },
      {
        "id": "D18_marriage_choice",
        "stage": "family",
        "title": "步入婚姻嗎？",
        "conditions": {
          "age_range": [
            23,
            40
          ],
          "has_partner": true
        },
        "options": [
          {
            "key": "traditional_wedding",
            "label": "辦傳統婚禮（聘金、喜餅、宴客）",
            "effects": {
              "married": true,
              "money_delta_twd_2025": -600000,
              "relationships": 8
            },
            "requires_wedding_afford": true
          },
          {
            "key": "simple_registration",
            "label": "簡單登記／公證不宴客",
            "effects": {
              "married": true,
              "money_delta_twd_2025": -50000,
              "happiness": 4
            },
            "era_labels": [
              {
                "max_year": 2009,
                "label": "從簡公證結婚不辦大宴客（省下可觀婚禮支出）"
              },
              {
                "min_year": 2010,
                "label": "簡單登記不宴客，把預算留作兩人生活基金"
              }
            ]
          },
          {
            "key": "stay_unmarried",
            "label": "維持同居或不婚",
            "effects": {
              "married": false,
              "financial_autonomy": true,
              "old_age_loneliness_risk": 0.15
            }
          }
        ]
      },
      {
        "id": "D19_have_children",
        "stage": "family",
        "title": "生不生小孩？",
        "conditions": {
          "age_range": [
            24,
            42
          ],
          "has_partner": true
        },
        "options": [
          {
            "key": "have_child",
            "label": "生育下一代，迎接家庭新成員",
            "effects": {
              "children_delta": 1,
              "annual_child_cost_years": 22,
              "subsidy_post_2026_twd": 100000,
              "old_age_support": 10
            },
            "era_labels": [
              {
                "max_year": 2025,
                "label": "決定生育下一代，迎接家庭新成員"
              },
              {
                "min_year": 2026,
                "label": "決定生育下一代（可申領每胎 10 萬元生育補助）"
              }
            ]
          },
          {
            "key": "dink_pets",
            "label": "當頂客族／改養毛小孩",
            "effects": {
              "savings_rate_bonus": 0.15,
              "happiness": 5,
              "old_age_support": -5
            }
          }
        ]
      },
      {
        "id": "D20_marriage_crisis",
        "stage": "family",
        "title": "婚姻亮紅燈",
        "conditions": {
          "age_range": [
            30,
            55
          ],
          "married": true
        },
        "options": [
          {
            "key": "move_out_counseling",
            "label": "搬離婆家／夫家並做婚姻諮商",
            "effects": {
              "rent_cost_added": true,
              "repair_prob": 0.65
            }
          },
          {
            "key": "endure_for_kids",
            "label": "為了孩子與長輩面子硬撐",
            "effects": {
              "happiness": -15,
              "health": -6
            }
          },
          {
            "key": "divorce",
            "label": "協議離婚重啟人生",
            "effects": {
              "married": false,
              "asset_split": 0.5,
              "short_term_happiness": -12,
              "long_term_happiness": 8
            }
          }
        ]
      },
      {
        "id": "D21_child_education_race",
        "stage": "family",
        "title": "下一代的教育軍備賽",
        "conditions": {
          "age_range": [
            35,
            50
          ],
          "has_school_age_child": true
        },
        "options": [
          {
            "key": "private_cram",
            "label": "送私校、雙語安親與全科補習",
            "effects": {
              "annual_expense_mult": 1.35,
              "child_mobility_bonus": 0.25
            },
            "requires_cram_afford": true
          },
          {
            "key": "public_balanced",
            "label": "念學區公校、適性快樂成長",
            "effects": {
              "relationships": 6,
              "happiness": 4
            }
          }
        ]
      },
      {
        "id": "D22_major_disaster",
        "stage": "late_and_crisis",
        "title": "重大天災後的去留",
        "conditions": {
          "trigger_events": [
            "EV_1963_gloria_typhoon_shihmen",
            "EV_1959_87_flood",
            "EV_1999_921_earthquake",
            "EV_2008_2009_gfc_22k_morakot",
            "EV_2024_hualien_quake_housing_peak",
            "EV_2025_2026_super_aged_ai_tariff"
          ]
        },
        "options": [
          {
            "key": "rebuild_local",
            "label": "申請補助原地重建家園",
            "effects": {
              "money_delta_ratio": -0.3,
              "relationships": 6,
              "happiness": -8
            }
          },
          {
            "key": "relocate_region",
            "label": "舉家遷往其他大區重新開始",
            "effects": {
              "migrate_to": "other_region",
              "money_delta_ratio": -0.2,
              "relationships": -8
            }
          }
        ]
      },
      {
        "id": "D23_pandemic_dilemma",
        "stage": "late_and_crisis",
        "title": "世紀疫情下的兩難",
        "conditions": {
          "trigger_years": [
            2003,
            2020,
            2021,
            2022
          ]
        },
        "options": [
          {
            "key": "strict_stay_home",
            "label": "嚴格居家避險／暫停營業",
            "effects": {
              "infection_risk_mult": 0.3,
              "income_mult": 0.65,
              "happiness": -5
            }
          },
          {
            "key": "keep_working",
            "label": "為了生計照常出門（或醫護留守前線）",
            "effects": {
              "infection_risk_mult": 1.8,
              "income_mult": 1.0
            }
          }
        ]
      },
      {
        "id": "D24_elderly_care_storm",
        "stage": "late_and_crisis",
        "title": "三明治世代的長照風暴",
        "conditions": {
          "age_range": [
            42,
            62
          ],
          "has_aging_parents": true
        },
        "options": [
          {
            "key": "hire_caregiver",
            "label": "聘外籍看護或送長照機構",
            "effects": {
              "monthly_care_cost_twd_2025": 35000,
              "keep_job": true
            },
            "requires_caregiver_afford": true
          },
          {
            "key": "quit_fulltime_care",
            "label": "辭職回家全職照顧父母",
            "effects": {
              "job_lost": true,
              "health": -12,
              "happiness": -15,
              "relationships": 6
            }
          },
          {
            "key": "share_with_siblings",
            "label": "與手足輪流＋申請政府長照資源（獨生子女鎖定不可選）",
            "requires_siblings": true,
            "effects": {
              "monthly_care_cost_twd_2025": 12000,
              "health": -3,
              "relationships": 4
            }
          }
        ]
      },
      {
        "id": "D25_retirement_timing",
        "stage": "late_and_crisis",
        "title": "退休時間點抉擇",
        "conditions": {
          "age_range": [
            55,
            68
          ]
        },
        "options": [
          {
            "key": "standard_retire",
            "label": "屆齡領勞保／勞退（或公教月退）退休",
            "effects": {
              "retired": true,
              "health": 8,
              "pension_active": true
            }
          },
          {
            "key": "second_career",
            "label": "退而不休／二度就業對抗長壽通膨",
            "effects": {
              "retired": false,
              "income_mult": 0.55,
              "relationships": 5,
              "health": -2
            }
          },
          {
            "key": "early_fire",
            "label": "提早財富自由（FIRE，需淨資產達標）",
            "requires_fire_assets": true,
            "effects": {
              "retired": true,
              "happiness": 15,
              "health": 10
            }
          }
        ]
      },
      {
        "id": "D26_end_of_life_autonomy",
        "stage": "late_and_crisis",
        "title": "人生最後一哩路",
        "conditions": {
          "age_range": [
            70,
            85
          ],
          "requires_year_min": 2019
        },
        "options": [
          {
            "key": "sign_ad",
            "label": "簽署《病主法》預立醫療決定（拒絕無效插管）並交代身後事",
            "effects": {
              "happiness": 8,
              "end_of_life_dignity": true,
              "terminal_cost_mult": 0.4
            }
          },
          {
            "key": "leave_to_family",
            "label": "避諱談生死，全權交由醫療與家人決定",
            "effects": {
              "terminal_cost_mult": 1.2,
              "bedridden_risk_mult": 1.4
            }
          }
        ]
      },
      {
        "id": "D28_debt_clearance",
        "stage": "finance",
        "title": "負債壓頂：聲請《消債條例》更生重啟人生？",
        "conditions": {
          "age_range": [
            25,
            72
          ],
          "requires_year_min": 2008,
          "max_assets_twd_2025": -1500000,
          "note": "2008 年 4 月《消費者債務清理條例》施行後解鎖，為雙卡風暴後台灣平民首度建立之個人破產更生機制"
        },
        "options": [
          {
            "key": "file_rehab",
            "label": "依《消債條例》向法院聲請更生（大幅減免債務重啟人生，信用註記數年）",
            "effects": {
              "debt_rehab_clear": true,
              "happiness": 16,
              "relationships": -2
            }
          },
          {
            "key": "grind_repay",
            "label": "咬牙靠自己硬扛還債（保住信用紀錄，但長期承受財務與身心高壓）",
            "effects": {
              "happiness": -6,
              "health": -4,
              "wage_mult": 1.04
            }
          }
        ]
      },
      {
        "id": "D29_child_study_abroad",
        "stage": "family",
        "title": "子女想出國留學：全額資助還是無力負擔？",
        "conditions": {
          "age_range": [
            45,
            62
          ],
          "has_school_age_child": true,
          "requires_year_min": 1978,
          "note": "依家庭存款與房產淨值檢定能否負擔子女海外學費與生活費"
        },
        "options": [
          {
            "key": "fund_abroad_full",
            "label": "動用存款全額資助子女赴海外留學圓夢（需流動資產達門檻）",
            "requires_child_abroad_cash": true,
            "effects": {
              "fund_child_abroad_cash": true,
              "happiness": 10,
              "relationships": 8
            }
          },
          {
            "key": "mortgage_home_for_child",
            "label": "增貸或變賣部分房產／退休老本送子女出國（需有足夠房產淨值）",
            "requires_child_abroad_home": true,
            "effects": {
              "fund_child_abroad_mortgage": true,
              "happiness": 6,
              "relationships": 8,
              "health": -4
            }
          },
          {
            "key": "cannot_afford_abroad",
            "label": "存款與薪資有限，只能婉拒留學、讓子女留在台灣升學或自行申貸",
            "effects": {
              "record_child_abroad_barrier": true,
              "happiness": -7,
              "relationships": -3
            }
          }
        ]
      },
      {
        "id": "D30_forced_home_sale",
        "stage": "finance",
        "title": "金融風暴與資金斷裂：面臨被迫賣房危機",
        "conditions": {
          "special": "forced_home_sale_crisis",
          "note": "當遇上股市崩盤斷頭、景氣危機失業或背負房貸現金流枯竭時觸發"
        },
        "options": [
          {
            "key": "sell_home_survive",
            "label": "忍痛降價賣房清償貸款與債務，退回租屋生活止血",
            "effects": {
              "forced_sell_home": true,
              "happiness": -18,
              "health": -4
            }
          },
          {
            "key": "borrow_hold_home",
            "label": "向親友借錢周轉／申請房貸寬限硬撐不賣房（需人際 ≥ 60 或家境 Q4 以上）",
            "requires_borrow_rescue": true,
            "effects": {
              "borrow_to_keep_home": true,
              "happiness": -12,
              "health": -8,
              "relationships": -6
            }
          },
          {
            "key": "foreclosure_auction",
            "label": "無力再繳本息，房屋遭銀行低價法拍（資產大幅折損並留存債務）",
            "effects": {
              "home_foreclosed": true,
              "happiness": -28,
              "health": -10
            }
          }
        ]
      }
    ]
  },
  "names": {
    "meta": {
      "schema_version": "1.0.0",
      "source": "內政部《全國姓名統計分析》",
      "note": "前十大姓氏占全台總人口逾52%；名字依出生世代抽取以確保時代真實感。"
    },
    "surnames": {
      "top_10_weighted": [
        {
          "surname": "陳",
          "weight": 0.111
        },
        {
          "surname": "林",
          "weight": 0.083
        },
        {
          "surname": "黃",
          "weight": 0.06
        },
        {
          "surname": "張",
          "weight": 0.053
        },
        {
          "surname": "李",
          "weight": 0.051
        },
        {
          "surname": "王",
          "weight": 0.041
        },
        {
          "surname": "吳",
          "weight": 0.04
        },
        {
          "surname": "劉",
          "weight": 0.032
        },
        {
          "surname": "蔡",
          "weight": 0.029
        },
        {
          "surname": "楊",
          "weight": 0.027
        }
      ],
      "other_common_pool_total_weight": 0.473,
      "other_common_pool": [
        "許",
        "鄭",
        "謝",
        "郭",
        "洪",
        "曾",
        "邱",
        "廖",
        "賴",
        "徐",
        "周",
        "葉",
        "蘇",
        "莊",
        "江",
        "呂",
        "何",
        "羅",
        "高",
        "蕭",
        "潘",
        "朱",
        "簡",
        "鍾",
        "彭",
        "游",
        "詹",
        "胡",
        "施",
        "沈",
        "余",
        "盧",
        "梁",
        "趙",
        "顏",
        "柯",
        "翁",
        "魏",
        "孫",
        "戴",
        "范",
        "方",
        "宋",
        "鄧",
        "杜",
        "傅",
        "侯",
        "曹",
        "薛",
        "丁"
      ]
    },
    "given_names_by_cohort": [
      {
        "cohort": "1950-1969",
        "roc_generation": "四、五年級生",
        "style_note": "鄉土樸實、單字重複度高（淑、美、雄、明）",
        "male": [
          "志明",
          "文雄",
          "正雄",
          "金龍",
          "國華",
          "榮宗",
          "明宏",
          "建國",
          "文華",
          "志忠"
        ],
        "female": [
          "淑芬",
          "淑惠",
          "美玲",
          "麗華",
          "秀英",
          "美惠",
          "麗美",
          "淑貞",
          "玉蘭",
          "秋月"
        ]
      },
      {
        "cohort": "1970-1979",
        "roc_generation": "六年級生",
        "style_note": "延續「淑／志」字輩，後期「家豪」崛起",
        "male": [
          "志明",
          "建宏",
          "俊傑",
          "志豪",
          "家豪",
          "志偉",
          "宗翰",
          "文傑",
          "政宏",
          "明哲"
        ],
        "female": [
          "淑芬",
          "淑惠",
          "雅惠",
          "美玲",
          "佳樺",
          "惠君",
          "怡靜",
          "曉萍",
          "婉婷",
          "嘉慧"
        ]
      },
      {
        "cohort": "1980-1989",
        "roc_generation": "七年級生",
        "style_note": "經典「家豪／雅婷／怡君」大戰時代",
        "male": [
          "家豪",
          "志豪",
          "志偉",
          "俊宏",
          "建宏",
          "宗翰",
          "冠宇",
          "承翰",
          "哲維",
          "育誠"
        ],
        "female": [
          "雅婷",
          "怡君",
          "怡婷",
          "佩珊",
          "佳穎",
          "雅雯",
          "詩涵",
          "郁婷",
          "婉君",
          "欣怡"
        ]
      },
      {
        "cohort": "1990-1999",
        "roc_generation": "八年級生",
        "style_note": "「冠、宇、柏、廷」成為男性主流",
        "male": [
          "家豪",
          "冠宇",
          "冠廷",
          "柏翰",
          "彥廷",
          "宇翔",
          "宗翰",
          "哲瑋",
          "孟翰",
          "韋廷"
        ],
        "female": [
          "雅婷",
          "怡君",
          "怡婷",
          "詩涵",
          "雅筑",
          "郁婷",
          "佩蓉",
          "佳穎",
          "育慈",
          "宜臻"
        ]
      },
      {
        "cohort": "2000-2010",
        "roc_generation": "九年級生",
        "style_note": "言情／偶像劇感用字大洗牌（承、宥、品、晴、彤）",
        "male": [
          "承恩",
          "宥廷",
          "宇恩",
          "承翰",
          "冠宇",
          "子軒",
          "柏宇",
          "品叡",
          "宇軒",
          "泓宇"
        ],
        "female": [
          "品妍",
          "詠晴",
          "子晴",
          "宜蓁",
          "羽彤",
          "語彤",
          "若晴",
          "昀臻",
          "思穎",
          "芯瑜"
        ]
      },
      {
        "cohort": "2011-2026",
        "roc_generation": "十年級以後",
        "style_note": "柔和中性字（沐、希、熙、樂、碩）流行",
        "male": [
          "恩碩",
          "宥廷",
          "宇恩",
          "承恩",
          "晨熙",
          "宥辰",
          "睿恩",
          "品睿",
          "沐恩",
          "樂軒"
        ],
        "female": [
          "詠晴",
          "品妍",
          "語彤",
          "沐晴",
          "宥希",
          "昀希",
          "苡彤",
          "子晴",
          "芯語",
          "樂樂"
        ]
      }
    ]
  },
  "educationCareers": {
    "meta": {
      "schema_version": "1.0.0",
      "coverage_years": [
        1950,
        2026
      ],
      "description": "台灣各年代教育資源、影子教育（補習）、階級城鄉差距，以及跨年代職涯與六大區薪資分布資料集。",
      "sources": [
        "教育部歷年教育統計與大專校院升學資料",
        "主計總處受僱員工薪資調查與家庭收支調查",
        "104 人力銀行各學門與職務薪資調查報告",
        "PISA 台灣學生學習表現與社經背景分析"
      ]
    },
    "education_eras": [
      {
        "id": "edu_1950_1969",
        "year_range": [
          1950,
          1969
        ],
        "label": "聯考窄門與克難求學期（1950–1960s）",
        "core_system": "國小畢業須考「初中聯考」（1968 年才實施九年國教）；師範公費與軍警校為清寒資優生首選。",
        "shadow_education": "國小課後「惡性補習」寫測驗卷盛行；外語與家教資源極度稀缺。",
        "class_regional_gap": "農村與東部家庭常集中資源供長子升學，女孩高機率國小或國中畢業即做工貼補家用。",
        "cram_school_cost_ratio": 0.04,
        "female_early_work_prob_q1_q2": 0.45,
        "flavor_events": [
          "國小下課後留校寫完滿滿一疊測驗卷，放學天色都黑了。",
          "同學家裡靠賣菜供哥哥讀省中，姊姊國中畢業就進成衣廠貼補家用。",
          "鎮上只有幾家書店，考前大家輪流傳抄油印的考古題講義。"
        ]
      },
      {
        "id": "edu_1970_1989",
        "year_range": [
          1970,
          1989
        ],
        "label": "五專盛世與南陽街補習狂潮（1970–1980s）",
        "core_system": "高中與大學聯考並立；五專（台北工專、高雄工專、明志等）與高職建教合作含金量極高；夜間部與 1986 空中大學盛行。",
        "shadow_education": "台北南陽街補習街進入全盛期，聚集近十萬重考生與高中衝刺班學生。",
        "class_regional_gap": "大學錄取率僅 25%–38%，明星高中主導頂大名額，外縣市學生北上重考食宿成本高昂。",
        "cram_school_cost_ratio": 0.08,
        "female_early_work_prob_q1_q2": 0.18,
        "flavor_events": [
          "每天放學背著沉重書包擠公車去補習街搶前排座位，手裡抓著十元麵包當晚餐。",
          "考上國立五專讓全家族放鞭炮慶祝，長輩說學一技之長最實在。",
          "聯考倒數百日，全班在教室後方貼滿紅紙誓師，夜晚路燈下全是背英文單字的身影。"
        ]
      },
      {
        "id": "edu_1990_2009",
        "year_range": [
          1990,
          2009
        ],
        "label": "410 教改、廣設大學與安親美語潮（1990–2000s）",
        "core_system": "1994 教改後廣設高中大學，2001 基測與 2002 大學多元入學上路，就學貸款普及，錄取率一路逼近九成。",
        "shadow_education": "立案文理補習班從 1997 年約 1,248 家暴增至 2006 年破 7,000 家，「安親班＋美語／心算」成為雙薪家庭標配。",
        "class_regional_gap": "學歷膨脹後競爭轉向「公立頂大 vs 後段私校」，Q1–Q2 家庭背負學貸比例顯著上升。",
        "cram_school_cost_ratio": 0.12,
        "female_early_work_prob_q1_q2": 0.05,
        "flavor_events": [
          "小學放學直接搭安親班娃娃車，接著上兒童美語與珠心算，晚上八點才回家吃飯。",
          "大學錄取率大幅攀升，長輩開始改口叮嚀「光念大學不夠，還要念國立研究所」。",
          "推甄申請入學要準備備審資料與才藝證明，家庭資源的落差逐漸顯現。"
        ]
      },
      {
        "id": "edu_2010_2070",
        "year_range": [
          2010,
          2130
        ],
        "label": "108 課綱、補習軍備賽與少子化退場（2010–2020s+）",
        "core_system": "2014 十二年國教（會考）、2019 年 108 課綱導入學習歷程檔案；實驗教育與雙語私校興起；2022 後私校退場加速。",
        "shadow_education": "全台補習班突破 18,000 家（數量超越便利商店），衍生學習歷程顧問、程式課、海外營隊等高單價軍備賽。",
        "class_regional_gap": "偏鄉小學約占 36%，PISA 顯示最富裕與最貧困家庭分數落差顯著；代理教師流動與數位落差並存。",
        "cram_school_cost_ratio": 0.15,
        "female_early_work_prob_q1_q2": 0.02,
        "flavor_events": [
          "補習班招牌比巷口超商還密集，週末還得趕場寫程式營隊與整理 108 課綱學習歷程檔案。",
          "雙語私校抽籤與入學考擠破頭，家長群組天天討論學區設籍與雙語教材。",
          "母校國小今年新生減班，老師感嘆十年前每個年級還有八個班。"
        ]
      }
    ],
    "careers": [
      {
        "id": "car_farmer_fisher",
        "name": "農漁民／青農",
        "era_range": [
          1950,
          2130
        ],
        "salary_mult_min": 0.58,
        "salary_mult_max": 0.85,
        "preferred_regions": [
          "south_tainan",
          "central",
          "south_kaohsiung",
          "east_islands"
        ],
        "min_edu_level": 0,
        "preferred_majors": [],
        "stability": 0.72,
        "health_drain": 0.6,
        "remote_capable": false,
        "flavor": "看天吃飯，早起巡田或出海，易受颱風與 2002 年 WTO 進口農產衝擊。"
      },
      {
        "id": "car_civil_teacher",
        "name": "軍公教／國營事業",
        "era_range": [
          1950,
          2130
        ],
        "salary_mult_min": 0.98,
        "salary_mult_max": 1.32,
        "preferred_regions": [
          "north_taipei",
          "east_islands",
          "central",
          "south_tainan",
          "south_kaohsiung"
        ],
        "min_edu_level": 3,
        "preferred_majors": [
          "public_funded",
          "humanities_biz"
        ],
        "stability": 0.99,
        "health_drain": 0.1,
        "remote_capable": false,
        "flavor": "工作極度穩定，1950–60 年代含實物配給與眷舍，2008 海嘯後更是青年避風港。"
      },
      {
        "id": "car_epz_worker",
        "name": "加工出口區作業員／紡織成衣員",
        "era_range": [
          1960,
          1995
        ],
        "salary_mult_min": 0.7,
        "salary_mult_max": 0.88,
        "preferred_regions": [
          "south_kaohsiung",
          "central",
          "north_hsinchu"
        ],
        "min_edu_level": 1,
        "preferred_majors": [],
        "stability": 0.75,
        "health_drain": 0.8,
        "remote_capable": false,
        "flavor": "1966 高雄加工出口區設立後，成為台灣經濟起飛與女性大量投入職場的縮影。"
      },
      {
        "id": "car_craft_apprentice",
        "name": "傳統技藝師傅（水電／木工／車床）",
        "era_range": [
          1950,
          2130
        ],
        "salary_mult_min": 0.85,
        "salary_mult_max": 1.35,
        "preferred_regions": [
          "central",
          "south_tainan",
          "north_taipei",
          "south_kaohsiung"
        ],
        "min_edu_level": 1,
        "preferred_majors": [],
        "stability": 0.82,
        "health_drain": 0.9,
        "remote_capable": false,
        "flavor": "熬過學徒出師後憑一技之長立身，近年缺工反讓老師傅身價看漲。"
      },
      {
        "id": "car_export_sales",
        "name": "外銷貿易業務（一卡皮箱走天下）",
        "era_range": [
          1970,
          2005
        ],
        "salary_mult_min": 1.25,
        "salary_mult_max": 2.1,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung"
        ],
        "min_edu_level": 3,
        "preferred_majors": [
          "humanities_biz"
        ],
        "stability": 0.76,
        "health_drain": 0.6,
        "remote_capable": false,
        "flavor": "提著裝滿樣品的一卡皮箱飛往歐美參展接單，撐起台灣外銷奇蹟。"
      },
      {
        "id": "car_sme_boss",
        "name": "傳產頭家／中小企業廠主",
        "era_range": [
          1970,
          2130
        ],
        "salary_mult_min": 0.8,
        "salary_mult_max": 3.2,
        "preferred_regions": [
          "central",
          "north_hsinchu",
          "south_kaohsiung",
          "south_tainan"
        ],
        "min_edu_level": 2,
        "preferred_majors": [],
        "stability": 0.62,
        "health_drain": 0.9,
        "remote_capable": false,
        "flavor": "從「客廳即工廠」黑手變頭家，順風時買透天、逆風時須扛關稅與軋票壓力。"
      },
      {
        "id": "car_doctor_lawyer",
        "name": "醫師／律師／會計師（三師）",
        "era_range": [
          1955,
          2130
        ],
        "salary_mult_min": 2.3,
        "salary_mult_max": 3.8,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung",
          "south_tainan"
        ],
        "min_edu_level": 4,
        "preferred_majors": [
          "stem_med"
        ],
        "stability": 0.95,
        "health_drain": 0.8,
        "remote_capable": false,
        "flavor": "門檻極高的頂尖專業，2025 調查醫師年薪中位數逾 211 萬元居各業之冠。"
      },
      {
        "id": "car_finance_broker",
        "name": "金融銀行／證券營業員／房仲",
        "era_range": [
          1980,
          2130
        ],
        "salary_mult_min": 1.35,
        "salary_mult_max": 2.6,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung"
        ],
        "min_edu_level": 4,
        "preferred_majors": [
          "humanities_biz"
        ],
        "stability": 0.78,
        "health_drain": 0.6,
        "remote_capable": true,
        "flavor": "1987–1990 股市狂潮年終豐厚，2024 金融保險業年薪中位數達 110.6 萬元。"
      },
      {
        "id": "car_hsinchu_semi",
        "name": "半導體／IC 設計／AI 工程師",
        "era_range": [
          1987,
          2130
        ],
        "salary_mult_min": 1.75,
        "salary_mult_max": 3.1,
        "preferred_regions": [
          "north_hsinchu",
          "south_tainan",
          "central",
          "south_kaohsiung"
        ],
        "min_edu_level": 4,
        "preferred_majors": [
          "stem_med"
        ],
        "stability": 0.88,
        "health_drain": 1.1,
        "remote_capable": true,
        "flavor": "1990–2007 享股票分紅配股紅利，2020s 乘 AI 出口浪潮成為高薪代表但輪班工時長。"
      },
      {
        "id": "car_cram_service_mgr",
        "name": "補教老師／連鎖服務業店長",
        "era_range": [
          1985,
          2130
        ],
        "salary_mult_min": 0.88,
        "salary_mult_max": 1.65,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung",
          "north_hsinchu"
        ],
        "min_edu_level": 3,
        "preferred_majors": [
          "humanities_biz"
        ],
        "stability": 0.8,
        "health_drain": 0.5,
        "remote_capable": false,
        "flavor": "伴隨服務業就業破六成與補教熱潮而起，工時多集中晚間與假日。"
      },
      {
        "id": "car_software_remote",
        "name": "軟體工程師／系統架構師",
        "era_range": [
          1998,
          2130
        ],
        "salary_mult_min": 1.25,
        "salary_mult_max": 2.2,
        "preferred_regions": [
          "north_taipei",
          "north_hsinchu",
          "central"
        ],
        "min_edu_level": 4,
        "preferred_majors": [
          "stem_med"
        ],
        "stability": 0.84,
        "health_drain": 0.6,
        "remote_capable": true,
        "flavor": "新鮮人起薪居各職務前段，2020 後具備跨國遠距與數位游牧彈性。"
      },
      {
        "id": "car_gig_delivery",
        "name": "外送員／平台司機（零工經濟）",
        "era_range": [
          2016,
          2130
        ],
        "salary_mult_min": 0.72,
        "salary_mult_max": 1.05,
        "preferred_regions": [
          "north_taipei",
          "north_hsinchu",
          "central",
          "south_tainan",
          "south_kaohsiung"
        ],
        "min_edu_level": 2,
        "preferred_majors": [],
        "stability": 0.7,
        "health_drain": 1.0,
        "remote_capable": false,
        "flavor": "時間彈性且門檻低，但缺乏職涯累積並承擔較高機車交通與日曬雨淋風險。"
      },
      {
        "id": "car_creator_ecom",
        "name": "自媒體／電商直播主／斜槓創作者",
        "era_range": [
          2014,
          2130
        ],
        "salary_mult_min": 0.45,
        "salary_mult_max": 2.8,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung"
        ],
        "min_edu_level": 3,
        "preferred_majors": [
          "humanities_biz"
        ],
        "stability": 0.55,
        "health_drain": 0.5,
        "remote_capable": true,
        "flavor": "高度 M 型化新興職涯，極少數爆紅致富，多數須面對演算法與流量焦慮。"
      },
      {
        "id": "car_healthcare_ltc",
        "name": "醫療護理師／長照居服員",
        "era_range": [
          1975,
          2130
        ],
        "salary_mult_min": 0.85,
        "salary_mult_max": 1.25,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung",
          "east_islands",
          "south_tainan"
        ],
        "min_edu_level": 3,
        "preferred_majors": [
          "stem_med"
        ],
        "stability": 0.94,
        "health_drain": 1.0,
        "remote_capable": false,
        "flavor": "超高齡社會最不可或缺的剛性專業，輪班護病比高但幾乎沒有失業風險。"
      },
      {
        "id": "car_tourism_hospitality",
        "name": "觀光旅宿／餐飲從業人員",
        "era_range": [
          1985,
          2130
        ],
        "salary_mult_min": 0.68,
        "salary_mult_max": 1.02,
        "preferred_regions": [
          "east_islands",
          "south_tainan",
          "south_kaohsiung",
          "north_taipei"
        ],
        "min_edu_level": 2,
        "preferred_majors": [
          "humanities_biz"
        ],
        "stability": 0.72,
        "health_drain": 0.7,
        "remote_capable": false,
        "flavor": "花東離島與古都核心產業，受景氣、地震與 2021 疫情無薪假衝擊最直接。"
      }
    ]
  },
  "cultureEras": {
    "meta": {
      "schema_version": "1.0.0",
      "coverage_years": [
        1950,
        2026
      ],
      "description": "台灣各年代家庭觀念、性別角色、理財習俗、社會氛圍與跨海通訊載體語料庫。",
      "sources": [
        "台灣戰後社會史與民俗研究公開整理",
        "內政部初婚與生育統計演變",
        "主計總處與媒體整理之台灣社會記憶紀事"
      ]
    },
    "era_atmospheres": [
      {
        "id": "cult_1950_1969",
        "year_range": [
          1950,
          1969
        ],
        "label": "克難大家庭與戒嚴秩序期（1950–1960s）",
        "family_gender_norm": "三代同堂大家庭為主，重男輕女與養兒防老觀念深，多靠媒人相親結婚（初婚約 20–24 歲）。",
        "money_culture": "民間標會（互助會）盛行，美援麵粉袋改衣褲，生活克勤克儉。",
        "social_atmosphere": "戒嚴高壓（「小心匪諜就在你身邊」）、鄰里守望相助、守著收音機聽廣播劇與愛國獎券開獎。",
        "typical_first_marriage_age": 22,
        "overseas_comm_channel": "航空家書與昂貴的越洋接線長途電話",
        "daily_vignettes": [
          "家裡把美援麵粉袋洗淨車成短褲與內衣，左鄰右舍的孩子都穿一樣的布料。",
          "巷口雜貨店響起愛國獎券開獎廣播，大人們屏息核對手中泛黃的獎券。",
          "母親參加鄰里的民間互助會（標會），每月省吃儉用存錢幫家裡添購腳踏車。"
        ]
      },
      {
        "id": "cult_1970_1989",
        "year_range": [
          1970,
          1989
        ],
        "label": "經濟起飛、投機狂潮與解嚴甦醒（1970–1980s）",
        "family_gender_norm": "工業化帶動小家庭增加，仍重婆媳同住與傳宗接代；「客廳即工廠」全家趕工組裝代工品。",
        "money_culture": "「台灣錢淹腳目」投機熱：大家樂、六合彩求明牌，券商號子擠滿菜籃族。",
        "social_atmosphere": "「愛拚才會贏」的經濟自信、校園民歌、錄影帶出租店，以及 1987 解嚴後百花齊放的公民社會。",
        "typical_first_marriage_age": 25,
        "overseas_comm_channel": "航空郵簡、越洋電話卡與傳真機",
        "daily_vignettes": [
          "晚飯後全家圍在客廳趕工組裝聖誕燈泡與塑膠花，電視正播著三台八點檔連續劇。",
          "鄰居阿伯熱衷大家樂求明牌，巷口證券號子一早開門就擠滿看盤的菜籃族。",
          "收音機裡傳來校園民歌與《愛拚才會贏》，街頭偶爾可見解嚴後熱烈的社會運動布條。"
        ]
      },
      {
        "id": "cult_1990_2009",
        "year_range": [
          1990,
          2009
        ],
        "label": "民主深化、網路萌芽與雙薪轉折（1990–2000s）",
        "family_gender_norm": "雙薪核心家庭成主流，女性高教比例追上男性，開始挑戰聘金與過年回娘家習俗；2006 年離婚率達高峰。",
        "money_culture": "雙卡消費風潮與 2005 卡債危機、2008 雷曼連動債教訓，2003 SARS 後房價展開長多頭。",
        "social_atmosphere": "1996 首次總統直選、2000 首次政黨輪替；BBS／PTT、無名小站、漫畫王與網咖成為青春記憶。",
        "typical_first_marriage_age": 29,
        "overseas_comm_channel": "BBS／PTT 看板、MSN 即時通與 Skype 網路電話",
        "daily_vignettes": [
          "下班或下課後掛在 BBS／PTT 與 MSN 上聊天，同學間互相幫對方的無名小站衝人氣。",
          "選舉前夕造勢晚會旗海飄揚，電視政論節目每晚熱烈辯論台灣的前途。",
          "房仲傳單越貼越密，身邊剛出社會的朋友開始感嘆薪水停在 22K 追不上房價。"
        ]
      },
      {
        "id": "cult_2010_2070",
        "year_range": [
          2010,
          2130
        ],
        "label": "平權覺醒、少子高齡與全民存股時代（2010–2020s+）",
        "family_gender_norm": "晚婚與不婚不生成常態（2024 初婚男 33.1、女 31.1 歲）；2019 同婚合法化；養毛小孩與獨生子女長照壓力並存。",
        "money_culture": "全民定期定額存股與 ETF（0050、高股息）、新青安 40 年房貸、FIRE 思潮與提防投資詐騙。",
        "social_atmosphere": "公民運動與 #MeToo 性平覺醒、24 小時便利商店與外送文化、AI 浪潮與高齡孤獨交織。",
        "typical_first_marriage_age": 32,
        "overseas_comm_channel": "LINE 家族群組、即時視訊與台灣社群媒體",
        "daily_vignettes": [
          "午休時同事聚在一起滑手機看 0050 與台股大盤，手裡各拿一杯半糖去冰的手搖飲。",
          "家族 LINE 群組每天早上湧入長輩圖，還有親友轉傳的防詐騙提醒與旅遊照片。",
          "身邊越來越多朋友選擇不婚不生、領養貓狗作伴，週末逛文創市集與露營。"
        ]
      }
    ],
    "taiwan_customs": [
      {
        "id": "cust_exam_temple",
        "stage": "childhood_exam",
        "age_range": [
          14,
          18
        ],
        "text": "大考前夕，家人帶著你的准考證影本與蔥、芹菜、包子粽子（「包中」）前往文昌廟祈福。",
        "homesickness_boost": 4,
        "happiness_delta": 2,
        "social_delta": 2,
        "cultural_footnote_en": "Before major exams, Taiwanese families pray to Wenchang Dijun (God of Culture) with scallions (smartness) and buns/zongzi (pun for 'passing')."
      },
      {
        "id": "cust_lny_adult",
        "stage": "lunar_new_year",
        "age_range": [
          23,
          45
        ],
        "text": "農曆除夕圍爐，你從領紅包變成包紅包給父母與晚輩，餐桌上免不了被親戚輪流關心「何時結婚、薪水多少」。",
        "homesickness_boost": 8,
        "happiness_delta": 1,
        "social_delta": 3,
        "cultural_footnote_en": "Once employed, Taiwanese adults switch from receiving to giving Lunar New Year red envelopes—while dodging relatives' classic questions about marriage and salary."
      },
      {
        "id": "cust_qingming_ghost",
        "stage": "lunar_new_year",
        "age_range": [
          20,
          75
        ],
        "text": "清明連假塞在國道返鄉掃墓，中元節公司門口擺滿綠色乖乖與普渡供品祈求系統平安順遂。",
        "homesickness_boost": 6,
        "happiness_delta": 1,
        "social_delta": 2,
        "cultural_footnote_en": "Green 'Kuai Kuai' (meaning 'behave well') coconut snacks are famously placed on servers, hospital machines, and semiconductor fabs in Taiwan to prevent glitches."
      },
      {
        "id": "cust_postpartum",
        "stage": "postpartum_care",
        "age_range": [
          26,
          42
        ],
        "text": "迎接新生命後，家中安排「坐月子」（麻油雞補身或入住產後護理之家），成為雙薪家庭重要的育兒起點。",
        "homesickness_boost": 12,
        "happiness_delta": 4,
        "social_delta": 4,
        "cultural_footnote_en": "Taiwan's 'zuo yuezi' (postpartum confinement) centers offer 30 days of specialized nursing care and herbal meals, often a major reason overseas Taiwanese consider giving birth back home."
      },
      {
        "id": "cust_wedding_red_envelope",
        "stage": "marriage_family",
        "age_range": [
          25,
          45
        ],
        "text": "收到好幾張「紅色炸彈」（喜帖），忙著翻出禮金簿核對當年包多少、盤算回禮行情。",
        "homesickness_boost": 5,
        "happiness_delta": 1,
        "social_delta": 3,
        "cultural_footnote_en": "Wedding invitations are jokingly called 'red bombs'; guests give even-numbered cash gifts in red envelopes, carefully tracked in family ledgers for reciprocation."
      }
    ],
    "personality_traits": [
      {
        "id": "cautious",
        "name": "謹慎保守",
        "name_en": "Cautious & Conservative",
        "desc": "重視安全與儲蓄，對高利誘惑與高風險場合保持戒心。",
        "init_bonus": {
          "knowledge": 3,
          "happiness": -1
        }
      },
      {
        "id": "risk_taker",
        "name": "冒險投機",
        "name_en": "Risk-Taking & Speculative",
        "desc": "勇於承擔風險追求高報酬，但也較容易捲入各年代的金融泡沫與吸金風暴。",
        "init_bonus": {
          "happiness": 3,
          "knowledge": 1
        }
      },
      {
        "id": "civic_minded",
        "name": "熱心正義",
        "name_en": "Civic-Minded & Justice-Driven",
        "desc": "關心台灣社會與公共議題，在歷史轉折點容易站出來發聲或參與公民行動。",
        "init_bonus": {
          "social": 4,
          "knowledge": 3
        }
      },
      {
        "id": "workaholic",
        "name": "拼命三郎",
        "name_en": "Driven Workaholic",
        "desc": "工作投入度高、收入成長快，但健康與過勞風險也相對提高。",
        "init_bonus": {
          "knowledge": 4,
          "health": -3
        }
      },
      {
        "id": "sociable",
        "name": "愛湊熱鬧",
        "name_en": "Outgoing & Event-Loving",
        "desc": "熱愛社交、派對、夜市與連假旅行，人脈豐富但也較常出沒於人潮聚集場合。",
        "init_bonus": {
          "social": 6,
          "happiness": 4
        }
      },
      {
        "id": "family_first",
        "name": "顧家重情",
        "name_en": "Family-First & Loyal",
        "desc": "凡事以家人親友為重，連假必返鄉、樂於幫親友周轉，牽絆深厚。",
        "init_bonus": {
          "social": 5,
          "happiness": 2
        }
      },
      {
        "id": "sensitive_introvert",
        "name": "細膩內向",
        "name_en": "Sensitive & Introverted",
        "desc": "生活規律低調、少涉險境，但面對社會巨變與職場高壓時心理感受較深。",
        "init_bonus": {
          "knowledge": 4,
          "social": -4
        }
      }
    ]
  },
  "studyAbroad": {
    "meta": {
      "schema_version": "1.0.0",
      "coverage_years": [
        1955,
        2070
      ],
      "description": "台灣出國留學制度沿革、6 大留學契機管道、6 個主要留學國家年代事件，以及 12 項吸引回國契機與海歸抉擇資料庫。",
      "sources": [
        "教育部國際及兩岸教育司 2016–2025 留學簽證人數統計",
        "IIE Open Doors 2024 台灣赴美留學生報告",
        "教育部公自費留學考試沿革（1955 恢復公費、1976 廢除自費留考、1984 歐洲公費名額）",
        "外交部青年度假打工協定沿革（2004 澳洲、2009 日本等）"
      ]
    },
    "institutional_milestones": [
      {
        "year": 1955,
        "name": "恢復辦理公費留學考試",
        "note": "早期菁英出國主要管道，受出入境與兵役嚴格管制。"
      },
      {
        "year": 1976,
        "name": "廢除自費留學考試",
        "note": "大幅降低自費出國門檻，引爆 1970–80 年代赴美留學狂潮。"
      },
      {
        "year": 1984,
        "name": "增設歐洲公費留學名額",
        "note": "推動台灣留學生版圖擴展至英、德、法等歐洲國家。"
      },
      {
        "year": 1989,
        "name": "放寬高中畢業生出國與小留學生潮",
        "note": "配合新台幣大幅升值，富裕家庭送子女提早赴美加求學。"
      },
      {
        "year": 2004,
        "name": "台澳打工度假協定生效",
        "note": "無名額上限、免英檢，開啟非富裕青年赴澳存桶金與轉留學通道。"
      },
      {
        "year": 2009,
        "name": "台日打工度假協定生效",
        "note": "帶動青年赴日打工、進修語言與轉職就業風潮。"
      }
    ],
    "pathways": [
      {
        "id": "SA01_gov_scholarship",
        "name": "公費留考／國外全額獎學金線",
        "year_range": [
          1958,
          2070
        ],
        "age_range": [
          22,
          26
        ],
        "min_quintile": 1,
        "max_quintile": 5,
        "min_knowledge": 75,
        "requires_edu_min": 4,
        "cost_twd_2025": 250000,
        "study_years": 2,
        "allowed_countries": [
          "USA",
          "JPN",
          "GBR",
          "DEU"
        ],
        "desc": "憑藉頂尖成績考取教育部公費或拿到國外名校 TA／RA 全額獎學金（「來來來，來台大；去去去，去美國」經典翻身路徑）。",
        "source_note": "1955 年起恢復公費留考，成為清寒學子跨越階級的重要通道。"
      },
      {
        "id": "SA02_self_funded_grad",
        "name": "自費出國攻讀碩士（托福／GRE／雅思）",
        "year_range": [
          1976,
          2070
        ],
        "age_range": [
          22,
          27
        ],
        "min_quintile": 3,
        "max_quintile": 5,
        "min_knowledge": 55,
        "requires_edu_min": 4,
        "cost_twd_2025": 2200000,
        "study_years": 2,
        "allowed_countries": [
          "USA",
          "GBR",
          "JPN",
          "AUS",
          "CAN",
          "DEU"
        ],
        "desc": "1976 年廢除自費留考後最普遍的留學路徑：在補習班苦讀托福／雅思，搭配家庭資助或留學貸款赴海外深造。",
        "source_note": "2024 年台灣留學生約 6.3 萬人，美、日、澳、英、加為前五大熱門國家。"
      },
      {
        "id": "SA03_young_student",
        "name": "小留學生（中學／大學提早出國）",
        "year_range": [
          1989,
          2070
        ],
        "age_range": [
          15,
          18
        ],
        "min_quintile": 4,
        "max_quintile": 5,
        "min_knowledge": 45,
        "requires_edu_min": 2,
        "cost_twd_2025": 3500000,
        "study_years": 4,
        "allowed_countries": [
          "USA",
          "CAN",
          "AUS",
          "GBR"
        ],
        "desc": "父母趁新台幣升值或為避開台灣高壓聯考，決定送你提早赴美加澳英當小留學生。",
        "source_note": "1989 年後放寬出國留學限制，溫哥華、加州與雪梨成為熱門小留學生據點。"
      },
      {
        "id": "SA04_exchange_dual",
        "name": "大學交換學生／雙聯學位轉留學",
        "year_range": [
          2005,
          2070
        ],
        "age_range": [
          20,
          22
        ],
        "min_quintile": 2,
        "max_quintile": 5,
        "min_knowledge": 62,
        "requires_edu_min": 4,
        "cost_twd_2025": 650000,
        "study_years": 1,
        "allowed_countries": [
          "JPN",
          "DEU",
          "USA",
          "GBR",
          "CAN"
        ],
        "desc": "申請教育部學海飛颺或校際交換計畫赴海外體驗一年，順勢銜接當地碩士或實習。",
        "source_note": "2000 年代後期台灣大學國際化普及，交換生大幅降低出國門檻。"
      },
      {
        "id": "SA05_working_holiday",
        "name": "海外打工度假（存桶金轉留學／移民）",
        "year_range": [
          2004,
          2070
        ],
        "age_range": [
          21,
          30
        ],
        "min_quintile": 1,
        "max_quintile": 4,
        "min_knowledge": 30,
        "requires_edu_min": 3,
        "cost_twd_2025": 150000,
        "study_years": 1,
        "allowed_countries": [
          "AUS",
          "JPN",
          "GBR",
          "CAN"
        ],
        "desc": "不靠家裡資助，先赴澳、日、英、加打工度假賺取高時薪，再視情況轉讀當地語言或技職學校。",
        "source_note": "2004 台澳與 2009 台日打工度假協定生效，改變台灣年輕世代的海外流動方式。"
      },
      {
        "id": "SA06_midcareer_pivot",
        "name": "工作數年後出國轉碼 CS／攻讀 MBA",
        "year_range": [
          2010,
          2070
        ],
        "age_range": [
          26,
          34
        ],
        "min_quintile": 2,
        "max_quintile": 5,
        "min_knowledge": 60,
        "requires_edu_min": 4,
        "cost_twd_2025": 2400000,
        "study_years": 2,
        "allowed_countries": [
          "USA",
          "GBR",
          "CAN",
          "DEU",
          "AUS"
        ],
        "desc": "工作幾年後遇見台灣薪資天花板，決定拿出積蓄與留學貸款出國攻讀資工碩士或 MBA 博翻身。",
        "source_note": "2010 年代後台灣文組轉碼與職場中段出國比例顯著增加。"
      }
    ],
    "countries": [
      {
        "id": "USA",
        "flag": "🇺🇸",
        "name_zh": "美國",
        "name_en": "United States",
        "salary_mult_vs_tw": 2.35,
        "living_cost_mult_vs_tw": 1.95,
        "healthcare_wait_risk": 0.14,
        "pr_difficulty": 0.65,
        "summary": "台灣人最經典的留學首選（2024 逾 2.3 萬人）；薪資天花板最高，但面臨昂貴醫療與 H-1B 簽證抽籤壓力。",
        "era_events": [
          {
            "id": "AB_USA_1971_1979",
            "year_start": 1971,
            "year_end": 1979,
            "title": "美國校園反戰、保釣運動與 1979 台美斷交衝擊",
            "summary": "越戰反戰浪潮與保釣運動撕裂海外華人社群；1979 年美台斷交消息傳來，留學生對身分與台灣前途充滿焦慮。",
            "impact_note": "許多理工留學生選擇先在美扎根，日後成為 1980s 回台建立竹科與半導體產業的關鍵世代。",
            "cultural_footnote_en": "The 1971 Diaoyutai movement and 1979 US-ROC diplomatic break deeply shook Taiwanese students in America; many later returned to build Taiwan's Hsinchu Science Park.",
            "sensitive": false,
            "visa_crisis_prob": 0.05,
            "happiness_delta": -5,
            "money_mult": 1.0
          },
          {
            "id": "AB_USA_1985_1999",
            "year_start": 1985,
            "year_end": 1999,
            "title": "矽谷電腦與網路起飛黃金期",
            "summary": "美國個人電腦與網際網路產業狂飆，理工與商管留學生畢業即獲科技大廠搶才，申請綠卡相對順遂。",
            "impact_note": "造就大批美籍台裔科技中產家庭，也形成台灣與矽谷緊密的人才雙向走廊。",
            "cultural_footnote_en": "Taiwanese engineers became a vital backbone of Silicon Valley during the 1980s–90s PC and internet booms.",
            "sensitive": false,
            "visa_crisis_prob": 0.02,
            "happiness_delta": 6,
            "money_mult": 1.18
          },
          {
            "id": "AB_USA_2001_2009",
            "year_start": 2001,
            "year_end": 2009,
            "title": "911 後簽證審查趨嚴與 2008 華爾街金融海嘯",
            "summary": "2001 年 911 事件後美國大幅收緊外籍生與入境審查；2008 年雷曼破產引爆金融海嘯，畢業生求職凍結。",
            "impact_note": "外籍畢業生留下難度大增，部分台灣留學生提前回流亞洲金融與科技中心。",
            "cultural_footnote_en": "Post-9/11 visa vetting and the 2008 financial crisis made securing US work sponsorship far harder for Taiwanese graduates.",
            "sensitive": true,
            "visa_crisis_prob": 0.16,
            "happiness_delta": -6,
            "money_mult": 0.88
          },
          {
            "id": "AB_USA_2014_2019",
            "year_start": 2014,
            "year_end": 2019,
            "title": "H-1B 工作簽證抽籤大戰",
            "summary": "赴美留學生與科技申請暴增，H-1B 工作簽證中籤率大幅下滑，STEM 專業靠 3 年 OPT 苦撐抽籤。",
            "impact_note": "身分不確定性成為留美台灣青年最大的心理與職涯風險。",
            "cultural_footnote_en": "Plummeting H-1B visa lottery odds turned post-graduation immigration into a nerve-wracking gamble for Taiwanese students in the US.",
            "sensitive": false,
            "visa_crisis_prob": 0.22,
            "happiness_delta": -4,
            "money_mult": 1.05
          },
          {
            "id": "AB_USA_2020_2026",
            "year_start": 2020,
            "year_end": 2026,
            "title": "疫情反亞裔歧視、矽谷裁員潮與 AI 晶片設廠潮",
            "summary": "2020 年疫情封城伴隨反亞裔仇恨事件；2022–2024 科技大廠輪番裁員引爆 60 天寬限期離境危機；2024 後 AI 與台積電亞利桑那廠再度帶動需求。",
            "impact_note": "高薪與身分／治安風險強烈並存，讓不少旅美台灣人重新評估回台或轉往亞洲。",
            "cultural_footnote_en": "From 2020 pandemic isolation and 2022–24 tech layoffs (60-day visa grace period) to TSMC's Arizona fabs, life in the US swung dramatically.",
            "sensitive": true,
            "visa_crisis_prob": 0.18,
            "happiness_delta": -3,
            "money_mult": 1.1
          }
        ]
      },
      {
        "id": "JPN",
        "flag": "🇯🇵",
        "name_zh": "日本",
        "name_en": "Japan",
        "salary_mult_vs_tw": 1.3,
        "living_cost_mult_vs_tw": 1.35,
        "healthcare_wait_risk": 0.05,
        "pr_difficulty": 0.4,
        "summary": "文化親近、地緣最近的留學與就業大國；生活安全整潔，但受職場年功序列與匯率波動影響顯著。",
        "era_events": [
          {
            "id": "AB_JPN_1980_1991",
            "year_start": 1980,
            "year_end": 1991,
            "title": "日本泡沫經濟頂峰與日圓急升",
            "summary": "廣場協議後日圓大幅升值，東京地價與消費驚人，但留學生打工時薪折合台幣極為可觀。",
            "impact_note": "許多台灣留學生半工半讀撐過高昂東京房租，見證亞洲第一經濟體的黃金時代。",
            "cultural_footnote_en": "During Japan's 1980s bubble economy, surging yen wages rewarded part-time student workers despite sky-high Tokyo rents.",
            "sensitive": false,
            "visa_crisis_prob": 0.04,
            "happiness_delta": 3,
            "money_mult": 1.15
          },
          {
            "id": "AB_JPN_1992_2008",
            "year_start": 1992,
            "year_end": 2008,
            "title": "失落的十年、就職冰河期與 1995 阪神大地震",
            "summary": "泡沫破滅後日本企業緊縮徵才進入就職冰河期，外國留學生進大手企業門檻驟升；1995 年關西遭阪神強震重創。",
            "impact_note": "日本嚴格的新卒一括採用制度，使不少留日畢業生選擇返台發展。",
            "cultural_footnote_en": "Japan's post-bubble 'employment ice age' made corporate hiring fiercely competitive for foreign graduates.",
            "sensitive": true,
            "visa_crisis_prob": 0.14,
            "happiness_delta": -5,
            "money_mult": 0.9
          },
          {
            "id": "AB_JPN_2011_2019",
            "year_start": 2011,
            "year_end": 2019,
            "title": "311 東日本大地震後的台日深厚情誼與觀光熱潮",
            "summary": "2011 年 311 強震與福島核災震撼日本，台灣民間巨額捐款促成強烈台日友好；後續訪日觀光暴增，懂中文與日文的台灣人才炙手可熱。",
            "impact_note": "在日台灣人明顯感受到當地社會的友善與感謝，觀光與跨國職缺大開。",
            "cultural_footnote_en": "Taiwan's massive grassroots donations after Japan's 2011 Tohoku earthquake forged enduring warmth toward Taiwanese residents in Japan.",
            "sensitive": true,
            "visa_crisis_prob": 0.05,
            "happiness_delta": 4,
            "money_mult": 1.02
          },
          {
            "id": "AB_JPN_2020_2026",
            "year_start": 2020,
            "year_end": 2026,
            "title": "疫情鎖國、日圓大貶與台積電熊本設廠潮",
            "summary": "2020–2021 日本邊境嚴格管制致留學生苦等入境；2022–2026 日圓創數十年新低讓學費變親民，卻壓低留日薪資折合台幣吸引力；同時台積電熊本廠與日本高度人才簽證大舉招手。",
            "impact_note": "日圓貶值與台灣科技薪資上漲形成對比，留日逐漸由「賺高薪」轉為「追求生活品質」。",
            "cultural_footnote_en": "Historic yen depreciation in 2022–26 lowered tuition costs but narrowed Japan's wage edge over Taiwan, even as TSMC's Kumamoto fabs drew Taiwanese engineers.",
            "sensitive": false,
            "visa_crisis_prob": 0.04,
            "happiness_delta": 1,
            "money_mult": 0.88
          }
        ]
      },
      {
        "id": "AUS",
        "flag": "🇦🇺",
        "name_zh": "澳洲",
        "name_en": "Australia",
        "salary_mult_vs_tw": 1.75,
        "living_cost_mult_vs_tw": 1.55,
        "healthcare_wait_risk": 0.09,
        "pr_difficulty": 0.45,
        "summary": "留學移民與打工度假第一重鎮；高法定時薪與工作生活平衡極具魅力，但近年面臨大城市租屋荒與簽證收緊。",
        "era_events": [
          {
            "id": "AB_AUS_2004_2018",
            "year_start": 2004,
            "year_end": 2018,
            "title": "台澳打工度假熱潮與礦業高時薪時代",
            "summary": "2004 年台澳打工度假上路後，大批台灣青年赴澳農場、肉廠與餐飲業存下第一桶金，也掀起台灣社會對低薪與「台勞」的熱議。",
            "impact_note": "許多青年藉由打工度假累積存款與英語力，進一步轉讀護理、廚藝或會計申請技術移民。",
            "cultural_footnote_en": "The 2004 Taiwan-Australia Working Holiday pact sparked a massive wave of Taiwanese youth working farms and hospitality for high Australian wages.",
            "sensitive": false,
            "visa_crisis_prob": 0.06,
            "happiness_delta": 4,
            "money_mult": 1.15
          },
          {
            "id": "AB_AUS_2019_2022",
            "year_start": 2019,
            "year_end": 2022,
            "title": "世紀森林大火與近兩年最嚴格邊境封鎖",
            "summary": "2019 跨年野火籠罩東岸城市；2020–2021 澳洲封鎖國境近兩年，海外生被迫滯留當地或遠距苦讀。",
            "impact_note": "孤立感與不能返家探親的焦慮讓思鄉值飆升。",
            "cultural_footnote_en": "Australia's nearly two-year COVID border closure left many Taiwanese students stranded abroad unable to visit home.",
            "sensitive": true,
            "visa_crisis_prob": 0.12,
            "happiness_delta": -7,
            "money_mult": 0.92
          },
          {
            "id": "AB_AUS_2023_2026",
            "year_start": 2023,
            "year_end": 2026,
            "title": "高法定最低時薪（AU$24.95）與大城市租屋荒",
            "summary": "澳洲最低時薪持續調漲，但雪梨與墨爾本爆發嚴重租屋荒與房租暴漲，政府亦提高學生簽證與畢業生工簽門檻。",
            "impact_note": "名目時薪亮眼，但居住成本與技術移民積分競爭大幅拉高。",
            "cultural_footnote_en": "Despite world-leading minimum wages (AU$24.95/hr), an acute housing shortage and tighter visa rules reshaped life for Taiwanese in Australia.",
            "sensitive": false,
            "visa_crisis_prob": 0.15,
            "happiness_delta": -2,
            "money_mult": 1.02
          }
        ]
      },
      {
        "id": "GBR",
        "flag": "🇬🇧",
        "name_zh": "英國",
        "name_en": "United Kingdom",
        "salary_mult_vs_tw": 1.65,
        "living_cost_mult_vs_tw": 1.65,
        "healthcare_wait_risk": 0.16,
        "pr_difficulty": 0.58,
        "summary": "精簡「一年制碩士」最受台灣商管、設計與傳播學生青睞；但畢業後工作簽證政策歷經多次劇烈搖擺。",
        "era_events": [
          {
            "id": "AB_GBR_1990_2011",
            "year_start": 1990,
            "year_end": 2011,
            "title": "一年制碩士黃金期與倫敦創意金融磁吸",
            "summary": "學制緊湊、省下一年學費與機會成本的英國碩士大受台灣學生歡迎，設計、傳播與金融領域累積豐富國際人脈。",
            "impact_note": "成為台灣文商設計科系最熱門的歐洲深造據點。",
            "cultural_footnote_en": "The UK's intensive one-year master's degree became the top European choice for Taiwanese business, media, and design students.",
            "sensitive": false,
            "visa_crisis_prob": 0.08,
            "happiness_delta": 4,
            "money_mult": 1.05
          },
          {
            "id": "AB_GBR_2012_2019",
            "year_start": 2012,
            "year_end": 2019,
            "title": "取消 PSW 畢業工簽（2012）與英國脫歐公投（2016）",
            "summary": "2012 年 4 月英國取消 2 年畢業生工作簽證（PSW），多數留學生畢業即被迫返台；2016 脫歐公投引發英鎊重貶與歐洲流動受阻。",
            "impact_note": "政策緊縮讓這世代留英台灣人以「拿學位返台發展」為絕對大宗。",
            "cultural_footnote_en": "Abolishing the Post-Study Work visa in 2012 and the 2016 Brexit vote forced most Taiwanese UK graduates to return home immediately.",
            "sensitive": false,
            "visa_crisis_prob": 0.35,
            "happiness_delta": -5,
            "money_mult": 0.9
          },
          {
            "id": "AB_GBR_2021_2026",
            "year_start": 2021,
            "year_end": 2026,
            "title": "重啟 2 年畢業生簽證、高通膨與 2024 工簽薪資門檻大漲",
            "summary": "2021 年英國重啟 Graduate Route 2 年工簽吸引台灣留學潮回溫；但 2023–2025 面臨高通膨、NHS 看診漫長排隊，以及 2024 年技術工簽年薪門檻大幅拉高。",
            "impact_note": "兩年緩衝期雖好找實習，但轉長期贊助工作簽證的門檻再次變高。",
            "cultural_footnote_en": "The 2021 Graduate Route reopened UK careers, though inflation, long NHS waits, and steeper 2024 Skilled Worker salary thresholds tested newcomers.",
            "sensitive": false,
            "visa_crisis_prob": 0.2,
            "happiness_delta": -2,
            "money_mult": 0.96
          }
        ]
      },
      {
        "id": "CAN",
        "flag": "🇨🇦",
        "name_zh": "加拿大",
        "name_en": "Canada",
        "salary_mult_vs_tw": 1.68,
        "living_cost_mult_vs_tw": 1.55,
        "healthcare_wait_risk": 0.15,
        "pr_difficulty": 0.42,
        "summary": "溫哥華與多倫多長期為台灣家庭移民與留學熱門基地；多元友善，但近年面臨高房價與學簽配額縮減。",
        "era_events": [
          {
            "id": "AB_CAN_1990_2005",
            "year_start": 1990,
            "year_end": 2005,
            "title": "「太空人家庭」與溫哥華台灣新移民潮",
            "summary": "1990 年代大量台灣與香港中產家庭赴溫哥華、多倫多置產送子女求學，常見父親留台賺錢、母子留加的「太空人家庭」。",
            "impact_note": "台式珍珠奶茶與牛肉麵在溫哥華遍地開花，但也伴隨跨洋家庭聚少離多的考驗。",
            "cultural_footnote_en": "In the 1990s, 'astronaut families'—with one parent commuting back to Taiwan for work while children studied in Vancouver or Toronto—became a distinct diaspora pattern.",
            "sensitive": false,
            "visa_crisis_prob": 0.04,
            "happiness_delta": 2,
            "money_mult": 1.05
          },
          {
            "id": "AB_CAN_2010_2022",
            "year_start": 2010,
            "year_end": 2022,
            "title": "寬鬆畢業工簽（PGWP）與 Express Entry 留學移民熱",
            "summary": "加拿大推出最長 3 年畢業工簽與快速通道移民，吸引不少台灣青年透過公立學院（College）實現留學兼移民。",
            "impact_note": "成為美國 H-1B 抽籤落榜後最常見的北美替代方案。",
            "cultural_footnote_en": "Canada's generous Post-Graduation Work Permit (PGWP) and Express Entry drew many Taiwanese seeking a clearer path to residency than the US.",
            "sensitive": false,
            "visa_crisis_prob": 0.06,
            "happiness_delta": 4,
            "money_mult": 1.04
          },
          {
            "id": "AB_CAN_2023_2026",
            "year_start": 2023,
            "year_end": 2026,
            "title": "大城市房價失控與聯邦大砍國際學生配額",
            "summary": "溫哥華與多倫多房租高漲、家庭醫師一號難求；加拿大聯邦政府自 2024 起大幅削減留學生配額並收緊配偶工簽與永居分數。",
            "impact_note": "留學移民難度明顯上升，部分青年重新比較返台與留加的生活品質。",
            "cultural_footnote_en": "Soaring housing costs and healthcare backlogs led Canada in 2024–26 to cap international student permits and tighten residency paths.",
            "sensitive": false,
            "visa_crisis_prob": 0.16,
            "happiness_delta": -3,
            "money_mult": 0.95
          }
        ]
      },
      {
        "id": "DEU",
        "flag": "🇩🇪",
        "name_zh": "德國",
        "name_en": "Germany",
        "salary_mult_vs_tw": 1.62,
        "living_cost_mult_vs_tw": 1.38,
        "healthcare_wait_risk": 0.08,
        "pr_difficulty": 0.42,
        "summary": "公立大學多數免學費的歐陸高 CP 值首選；工程、製造與設計實力雄厚，畢業享 18 個月求職簽證。",
        "era_events": [
          {
            "id": "AB_DEU_1984_2005",
            "year_start": 1984,
            "year_end": 2005,
            "title": "歐洲公費拓荒、柏林圍牆倒塌（1989）與歐元上路（2002）",
            "summary": "1984 年台灣增設歐洲公費名額，留德學生見證 1989 柏林圍牆倒塌、兩德統一與 2002 歐元啟用的歷史巨變。",
            "impact_note": "歐陸人文與精密工程思維帶回台灣，豐富高教與產業視野。",
            "cultural_footnote_en": "After Taiwan expanded European scholarships in 1984, Taiwanese students in Germany witnessed the 1989 fall of the Berlin Wall and 2002 Euro launch.",
            "sensitive": false,
            "visa_crisis_prob": 0.06,
            "happiness_delta": 3,
            "money_mult": 1.0
          },
          {
            "id": "AB_DEU_2012_2026",
            "year_start": 2012,
            "year_end": 2026,
            "title": "英語碩士免學費潮、能源通膨與歐陸車電轉型",
            "summary": "德國公立大學免學費與 18 個月求職簽證吸引台灣理工與設計系精打細算深造；2022 俄烏戰爭後經歷能源通膨與工業轉型，但工作生活平衡與年假制度仍深具魅力。",
            "impact_note": "德語門檻與冬日漫長陰暗是留德台灣人最常面對的適應關卡。",
            "cultural_footnote_en": "Tuition-free German public universities and an 18-month job-seeker visa made Germany a top value destination for Taiwanese STEM and design students.",
            "sensitive": false,
            "visa_crisis_prob": 0.08,
            "happiness_delta": 2,
            "money_mult": 1.02
          }
        ]
      }
    ],
    "return_triggers": [
      {
        "id": "RT01_aging_parents",
        "category": "family_care",
        "title": "父母年邁生病，越洋電話裡的嘆息",
        "desc": "視訊裡父母的頭髮全白了，最近進出醫院次數變多卻總說「沒事，你專心在國外打拚」。思鄉與虧欠感湧上心頭。",
        "condition_type": "parents_aging",
        "age_range": [
          34,
          58
        ],
        "homesickness_delta": 25,
        "cultural_footnote_en": "Filial piety and aging parents are the #1 emotional pull bringing overseas Taiwanese back home."
      },
      {
        "id": "RT02_parent_passing",
        "category": "family_care",
        "title": "長輩病危奔喪：來不及見最後一面的震撼",
        "desc": "緊急訂下十幾小時後的紅眼機票飛回桃園機場，這場生離死別讓你重新思考：自己的人生究竟想陪在誰身邊？",
        "condition_type": "parent_passed_recently",
        "age_range": [
          35,
          65
        ],
        "homesickness_delta": 35,
        "cultural_footnote_en": "Missing a parent's final days across time zones is a defining turning point for many Taiwanese expatriates."
      },
      {
        "id": "RT03_childbirth_postpartum",
        "category": "family_care",
        "title": "迎接新生命：海外天價托育 vs 回台坐月子與父母後援",
        "desc": "異鄉育兒沒有親友幫手、托育費高昂，你開始認真考慮回台灣坐月子、讓孩子在阿公阿嬤身邊長大。",
        "condition_type": "has_partner_childbearing",
        "age_range": [
          28,
          42
        ],
        "homesickness_delta": 20,
        "cultural_footnote_en": "High childcare costs abroad and Taiwan's postpartum care ('zuo yuezi') + grandparent support draw young families home."
      },
      {
        "id": "RT04_martial_law_blacklist",
        "category": "national_reform_election",
        "title": "1987 解嚴與 1992 刑法 100 條修正：自由的故鄉在呼喚",
        "desc": "台灣解除長達 38 年戒嚴、黑名單逐步解凍，海外台灣人終於能自由返鄉參與民主化與公民社會建設。",
        "condition_type": "year_window",
        "years": [
          1987,
          1988,
          1992
        ],
        "homesickness_delta": 22,
        "cultural_footnote_en": "The 1987 lifting of Martial Law and 1992 abolition of political blacklists sparked a wave of overseas Taiwanese returning home."
      },
      {
        "id": "RT05_democratic_elections",
        "category": "national_reform_election",
        "title": "台灣歷史性總統大選與政黨輪替（1996／2000）",
        "desc": "看到台灣頂著壓力完成首次總統直選與和平政黨輪替，海外同鄉會熱淚盈眶，你動念想買張機票回家投下一票、甚至回台工作。",
        "condition_type": "year_window",
        "years": [
          1996,
          2000
        ],
        "homesickness_delta": 20,
        "cultural_footnote_en": "Taiwan's first direct presidential election (1996) and peaceful transfer of power (2000) stirred deep pride among the overseas diaspora."
      },
      {
        "id": "RT06_sunflower_voting_wave",
        "category": "national_reform_election",
        "title": "公民覺醒與海外返鄉投票潮（2014／2016／2020／2024）",
        "desc": "滑著社群媒體看見台灣年輕世代為公共議題發聲、海外留學生集資包機返鄉投票，你感受到自己與這座島嶼無法切割的連結。",
        "condition_type": "year_window",
        "years": [
          2014,
          2016,
          2020,
          2024
        ],
        "homesickness_delta": 18,
        "cultural_footnote_en": "Overseas Taiwanese frequently fly thousands of miles home to cast ballots in Taiwan's high-stakes elections (absentee voting is not permitted)."
      },
      {
        "id": "RT07_same_sex_marriage",
        "category": "national_reform_election",
        "title": "2019 同婚專法生效：亞洲第一的自由與歸屬感",
        "desc": "台灣成為亞洲首個同性婚姻合法化國家，在國際新聞版面綻放光芒，讓你更渴望回到這片多元包容的土地生活。",
        "condition_type": "year_window",
        "years": [
          2019
        ],
        "homesickness_delta": 16,
        "cultural_footnote_en": "Becoming Asia's first country to legalize same-sex marriage in 2019 strengthened Taiwan's appeal as an open, progressive home."
      },
      {
        "id": "RT08_hsinchu_tech_boom",
        "category": "industry_visa",
        "title": "竹科起飛與海歸創業潮（1984–1998）",
        "desc": "工研院與新竹科學園區大舉向海外學人招手，開出高階職位、股票分紅與創業育成資源，不少矽谷學長姐已經打包回台。",
        "condition_type": "year_window",
        "years": [
          1984,
          1987,
          1990,
          1994,
          1997
        ],
        "homesickness_delta": 15,
        "cultural_footnote_en": "Returning Silicon Valley engineers founded and scaled many of Hsinchu Science Park's flagship semiconductor and PC firms."
      },
      {
        "id": "RT09_visa_layoff_crisis",
        "category": "industry_visa",
        "title": "海外簽證受阻或科技裁員寬限期危機",
        "desc": "工作簽證抽籤落榜、政策驟變或公司縮編，讓你在異鄉面臨身分倒數計時，必須決定死磕轉軌或帶著國際資歷返台。",
        "condition_type": "visa_crisis",
        "homesickness_delta": 18,
        "cultural_footnote_en": "Visa lotteries, sudden policy shifts (e.g., UK PSW repeal), and layoff grace periods regularly push overseas Taiwanese to reconsider returning."
      },
      {
        "id": "RT10_ai_semi_return",
        "category": "industry_visa",
        "title": "2022–2026 台灣 AI 半導體高薪回流潮",
        "desc": "台灣半導體與 AI 供應鏈成為全球焦點，高階工程師與跨國管理職開出直逼海外、且稅率更低的薪資條件向你招手。",
        "condition_type": "year_window",
        "years": [
          2022,
          2023,
          2025,
          2026
        ],
        "homesickness_delta": 15,
        "cultural_footnote_en": "Taiwan's AI hardware boom and lower effective tax rates narrowed the net-income gap with overseas hubs in 2022–26."
      },
      {
        "id": "RT11_healthcare_nhi_contrast",
        "category": "healthcare_safety",
        "title": "異鄉生病排隊與天價帳單：無比想念台灣健保",
        "desc": "在國外看專科醫師要排隊兩個月、急診帳單更是嚇人，對比台灣 1995 年開辦後便宜又即時的全民健保，回家的念頭更加強烈。",
        "condition_type": "health_below_overseas",
        "min_year": 1996,
        "homesickness_delta": 24,
        "cultural_footnote_en": "Taiwan's affordable, fast National Health Insurance (NHI, launched 1995) is consistently cited as a top draw for returning expatriates."
      },
      {
        "id": "RT12_covid_safe_haven",
        "category": "healthcare_safety",
        "title": "2020–2021 全球疫情封城 vs 台灣正常生活的強烈對比",
        "desc": "身處歐美澳嚴格封城與物資搶購之中，看著台灣親友在國內正常上班逛夜市、戴口罩零確診，你思考是否該直接搬回台灣。",
        "condition_type": "year_window",
        "years": [
          2020,
          2021
        ],
        "homesickness_delta": 28,
        "cultural_footnote_en": "During 2020–21, Taiwan's early pandemic success triggered a notable reverse-migration wave of overseas Taiwanese moving back."
      }
    ],
    "return_decision_template": {
      "id": "D27_return_to_taiwan",
      "title": "跨海的十字路口：回台灣，還是留在海外？",
      "options": [
        {
          "key": "return_taiwan",
          "label": "打包返台發展（海歸線：享海歸加給、健保與家人陪伴）",
          "effects": {
            "return_home": true,
            "relationships": 14,
            "happiness": 10
          }
        },
        {
          "key": "stay_abroad",
          "label": "留在當地扎根（移民／永居線：維持海外高薪與居留身分）",
          "effects": {
            "stay_abroad": true,
            "relationships": -6,
            "pr_progress": 1
          }
        },
        {
          "key": "commuter_nomad",
          "label": "成為「空中飛人／遠距跨國族」（半年海外、半年回台陪家人）",
          "requires_year_min": 2015,
          "requires_remote_or_senior": true,
          "effects": {
            "commuter_mode": true,
            "relationships": 6,
            "happiness": 6,
            "annual_travel_cost_twd_2025": 220000
          }
        }
      ]
    }
  },
  "lifeStages": {
    "meta": {
      "schema_version": "1.0.0",
      "description": "台灣各個人生時期所處環境的專屬互動事件與能力養成系統（童年、國中升學考、高中/高職五專/學徒分流、大學社團/實驗室/實習/公職備考、職場人脈進修、樂齡退休），所有分支皆受角色屬性與前期抉擇連動影響。",
      "sources": [
        "教育部十二年國教、高中職分流、技職證照與大專校院生涯追蹤調查",
        "台灣聯考（1954–2000）、國中基測（2001–2013）、國中會考（2014+）升學制度演變",
        "104 人力銀行大學生社團、實習、實驗室專題與初職薪資關聯調查"
      ]
    },
    "hs_exam_system": {
      "eras": [
        {
          "max_year": 1967,
          "name": "初中／省中聯考",
          "age": 12,
          "top_threshold": 68,
          "hs_threshold": 48
        },
        {
          "min_year": 1968,
          "max_year": 2000,
          "name": "高中聯考（北聯／中聯／南聯）",
          "age": 15,
          "top_threshold": 70,
          "hs_threshold": 50
        },
        {
          "min_year": 2001,
          "max_year": 2013,
          "name": "國中基本學力測驗（基測）",
          "age": 15,
          "top_threshold": 68,
          "hs_threshold": 46
        },
        {
          "min_year": 2014,
          "max_year": 2130,
          "name": "國中教育會考（12年國教免試／特招）",
          "age": 15,
          "top_threshold": 66,
          "hs_threshold": 42
        }
      ],
      "tiers": {
        "top_hs": {
          "label": "頂尖明星高中（各地第一志願）",
          "uni_bonus": 0.22,
          "knowledge_bonus": 10
        },
        "normal_hs": {
          "label": "普通高中",
          "uni_bonus": 0.05,
          "knowledge_bonus": 6
        },
        "vocational": {
          "label": "高職／五專技職體系",
          "uni_bonus": -0.05,
          "knowledge_bonus": 4,
          "skill_bonus": 1.08
        },
        "work_early": {
          "label": "不繼續升學，提早進入職場當學徒",
          "uni_bonus": -1.0,
          "knowledge_bonus": -3
        }
      }
    },
    "stage_events": [
      {
        "id": "LS01_childhood_env",
        "stage": "childhood",
        "title": "童年課後時光：補習、才藝還是放學野放？",
        "conditions": {
          "age_range": [
            9,
            13
          ],
          "in_taiwan_only": true
        },
        "desc": "國小到國中前夕，放學後的安排將悄悄拉開你的基礎學科能力、體能與人際性格，也會影響幾年後的升學考試表現。",
        "options": [
          {
            "key": "cram_study",
            "label": "上安親班／文理補習班狂寫評量（知識++、升學考加分、幸福-）",
            "effects": {
              "knowledge": 11,
              "happiness": -5,
              "health": -3,
              "money_delta_twd_2025": -90000,
              "flag_set": "childhood_cram",
              "hs_exam_bonus": 7
            }
          },
          {
            "key": "sports_arts",
            "label": "參加學校校隊／音樂美術才藝班（健康+、人際+、幸福+）",
            "effects": {
              "health": 7,
              "social": 8,
              "happiness": 6,
              "knowledge": 3,
              "money_delta_twd_2025": -50000,
              "flag_set": "childhood_talent"
            }
          },
          {
            "key": "help_family_play",
            "label": "放學幫家裡顧店／務農，剩餘時間和鄰居玩耍（省錢、顧家務實）",
            "effects": {
              "social": 5,
              "health": 4,
              "happiness": 2,
              "knowledge": -2,
              "money_delta_twd_2025": 15000,
              "flag_set": "childhood_family_help"
            }
          }
        ]
      },
      {
        "id": "LS02_junior_high_exam_branch",
        "stage": "junior_high_exam",
        "title": "升學大考放榜：高中、高職五專還是直接工作？",
        "conditions": {
          "special": "hs_exam_year",
          "in_taiwan_only": true
        },
        "desc": "動態生成（依當年代考制與你的知識值、家境與課後準備計算考試落點）",
        "options": [
          {
            "key": "enter_top_hs",
            "label": "進入頂尖明星高中（各地一中／女中：大學升學率大幅加成）",
            "requires_exam_tier": "top_hs",
            "effects": {
              "track": "top_academic",
              "knowledge": 10,
              "happiness": 4,
              "hs_tier": "top_hs"
            }
          },
          {
            "key": "enter_normal_hs",
            "label": "進入普通高中（往一般大學升學邁進）",
            "requires_exam_tier": "normal_hs_or_above",
            "effects": {
              "track": "academic",
              "knowledge": 7,
              "money_delta_ratio": -0.05,
              "hs_tier": "normal_hs"
            }
          },
          {
            "key": "enter_vocational",
            "label": "就讀高職或五專（學一技之長、考證照或日後拚統測升科大）",
            "effects": {
              "track": "vocational",
              "knowledge": 4,
              "early_job_ready": true,
              "hs_tier": "vocational"
            }
          },
          {
            "key": "stop_schooling",
            "label": "不繼續升學，直接進工廠／店面當學徒賺錢貼補家用",
            "effects": {
              "track": "labor",
              "money_delta_ratio": 0.1,
              "knowledge": -4,
              "max_edu_cap": "junior_high",
              "hs_tier": "work_early"
            }
          }
        ]
      },
      {
        "id": "LS03_high_school_track",
        "stage": "high_school",
        "title": "高中關鍵抉擇：選自然組還是社會組？社團怎麼辦？",
        "conditions": {
          "age": 16,
          "requires_hs_tier": [
            "top_hs",
            "normal_hs"
          ],
          "in_taiwan_only": true
        },
        "desc": "高二面臨文理組分班與社團幹部交接，你的選擇會直接影響 18 歲大學考科優勢與未來科系走向。",
        "options": [
          {
            "key": "science_cram",
            "label": "選自然組（二／三類）＋全力衝刺補習（知識++、開啟電資工程醫藥優勢）",
            "effects": {
              "knowledge": 10,
              "happiness": -5,
              "health": -3,
              "flag_set": "hs_group_science",
              "uni_admit_bonus": 0.1
            }
          },
          {
            "key": "humanities_club",
            "label": "選社會組（一類）＋扛下社團幹部／辦成發（人際++、幸福+、商管人文優勢）",
            "effects": {
              "social": 10,
              "happiness": 6,
              "knowledge": 4,
              "flag_set": "hs_group_humanities"
            }
          },
          {
            "key": "balanced_romance",
            "label": "課業維持中上，享受社團與青春初戀（幸福++、人際+、有機率早遇伴侶）",
            "effects": {
              "happiness": 9,
              "social": 7,
              "knowledge": 3,
              "flag_set": "hs_balanced",
              "partner_chance": 0.35
            }
          }
        ]
      },
      {
        "id": "LS04_vocational_path",
        "stage": "vocational_school",
        "title": "高職／五專校園抉擇：拚證照競賽、建教實習還是衝科大？",
        "conditions": {
          "age": 17,
          "requires_hs_tier": [
            "vocational"
          ],
          "in_taiwan_only": true
        },
        "desc": "身處台灣技職體系，你可以靠全國技藝競賽與乙級證照翻身，或是搶先進入職場累積存款與實務資歷。",
        "options": [
          {
            "key": "skill_cert_competition",
            "label": "苦練考取乙級技術士證照／拚全國技藝競賽（技能加薪、保送國立科大機會）",
            "requires_knowledge_min": 45,
            "effects": {
              "knowledge": 8,
              "wage_mult": 1.14,
              "flag_set": "vocational_elite",
              "uni_admit_bonus": 0.25
            }
          },
          {
            "key": "coop_internship",
            "label": "參加建教合作／提前進工廠與企業實習（存錢快、畢業直接轉正）",
            "effects": {
              "money_delta_twd_2025": 160000,
              "social": 5,
              "health": -3,
              "wage_mult": 1.06,
              "flag_set": "vocational_coop"
            }
          },
          {
            "key": "aim_tech_uni",
            "label": "報名補習班專攻統測／插大，目標洗上國立科技大學",
            "effects": {
              "knowledge": 9,
              "happiness": -4,
              "money_delta_twd_2025": -60000,
              "uni_admit_bonus": 0.18
            }
          }
        ]
      },
      {
        "id": "LS05_early_apprentice",
        "stage": "early_work",
        "title": "少年學徒的十字路口：熬出師還是半工半讀補學歷？",
        "conditions": {
          "age": 17,
          "requires_hs_tier": [
            "work_early"
          ],
          "in_taiwan_only": true
        },
        "desc": "提早踏入社會兩年，每天在工廠、工地或店面流汗磨練。接下來的決定會左右你二十歲後的起跑高度。",
        "options": [
          {
            "key": "master_craft",
            "label": "咬牙熬過三年四個月跟師傅學滿技術（出師後成搶手技藝師傅，收入大幅跳升）",
            "effects": {
              "health": -4,
              "wage_mult": 1.28,
              "flag_set": "master_craftsman",
              "knowledge": 4
            }
          },
          {
            "key": "night_school",
            "label": "白天工作、晚上念夜校／空中大學補完高職或大學學歷（解除學歷上限！）",
            "effects": {
              "knowledge": 10,
              "health": -5,
              "happiness": -3,
              "unlock_night_edu": true,
              "flag_set": "night_school_grad"
            }
          },
          {
            "key": "casual_jobs",
            "label": "換過幾份餐飲與超商打工，維持自由生活步調",
            "effects": {
              "happiness": 4,
              "social": 4,
              "wage_mult": 0.96
            }
          }
        ]
      },
      {
        "id": "LS06_university_campus_life",
        "stage": "university",
        "title": "大學黃金歲月（大一～大二）：玩社團、進實驗室還是打工？",
        "conditions": {
          "age_range": [
            19,
            20
          ],
          "requires_in_uni": true,
          "in_taiwan_only": true
        },
        "desc": "進入自由的大學校園，沒有老師盯早自習了。你把大把課餘時間投入哪裡，將深刻形塑你的能力結構與未來人脈。",
        "options": [
          {
            "key": "join_clubs",
            "label": "狂玩社團／系學會／辦宿營活動（人際++、戀愛機率↑、解鎖未來職場人脈內推）",
            "effects": {
              "social": 14,
              "happiness": 9,
              "knowledge": -2,
              "flag_set": "uni_club_leader",
              "partner_chance": 0.45
            }
          },
          {
            "key": "enter_lab",
            "label": "大二就進教授實驗室做專題／衝書卷獎（知識++、推甄頂大與留學獎學金大加分）",
            "requires_knowledge_min": 55,
            "effects": {
              "knowledge": 14,
              "happiness": -3,
              "health": -2,
              "flag_set": "uni_lab_research",
              "wage_mult": 1.08
            }
          },
          {
            "key": "parttime_tutor",
            "label": "狂接家教與校外打工存生活費（累積存款、減輕學貸、提早社會化）",
            "effects": {
              "money_delta_twd_2025": 220000,
              "social": 5,
              "health": -4,
              "flag_set": "uni_parttime"
            }
          },
          {
            "key": "double_major_coding",
            "label": "雙主修／輔系或自學程式跨領域（知識+、解鎖科技軟體與遠距職涯資格）",
            "effects": {
              "knowledge": 11,
              "happiness": -4,
              "flag_set": "uni_cross_coding",
              "remote_unlock": true,
              "wage_mult": 1.1
            }
          }
        ]
      },
      {
        "id": "LS07_university_career_prep",
        "stage": "university",
        "title": "大學畢業前夕（大三～大四）：實習卡位、備考公職還是拚研留學？",
        "conditions": {
          "age": 21,
          "requires_in_uni": true,
          "in_taiwan_only": true
        },
        "desc": "眼看就要畢業面對真實社會，身旁同學各自走上不同岔路。你在大三升大四這年決定把火力集中在哪條賽道？",
        "options": [
          {
            "key": "corp_internship",
            "label": "爭取知名企業實習／產學預聘（畢業即轉正、起薪加給）",
            "effects": {
              "wage_mult": 1.16,
              "social": 6,
              "knowledge": 5,
              "flag_set": "uni_internship",
              "money_delta_twd_2025": 120000
            },
            "era_labels": [
              {
                "max_year": 2008,
                "label": "爭取知名企業實習／產學預聘（畢業即轉正、起薪加給）"
              },
              {
                "min_year": 2009,
                "max_year": 2014,
                "label": "爭取知名企業實習／產學預聘（畢業即轉正、避開 22K 低薪定錨）"
              },
              {
                "min_year": 2015,
                "label": "爭取知名企業實習／產學預聘（畢業即轉正、起薪加給）"
              }
            ]
          },
          {
            "key": "prep_civil_exam",
            "label": "提早報名補習班備考公職／國營／國家專技證照（知識+、日後公職上榜率翻倍！）",
            "effects": {
              "knowledge": 10,
              "happiness": -6,
              "social": -4,
              "money_delta_twd_2025": -70000,
              "flag_set": "uni_civil_prep"
            }
          },
          {
            "key": "prep_grad_abroad",
            "label": "狂刷歷屆考研／托福 GRE 雅思衝刺（大幅提升國內頂大碩士與出國留學契機）",
            "effects": {
              "knowledge": 12,
              "happiness": -5,
              "flag_set": "uni_grad_abroad_prep"
            }
          },
          {
            "key": "grad_travel_youth",
            "label": "趁年輕機車環島、打工換宿與畢業旅行（幸福++、健康+、留下難忘青春）",
            "effects": {
              "happiness": 12,
              "health": 5,
              "social": 6,
              "money_delta_twd_2025": -40000
            }
          }
        ]
      },
      {
        "id": "LS08_workplace_levelup",
        "stage": "career_growth",
        "title": "職場進階關卡：靠人脈內推、考照升遷還是轉考公職？",
        "conditions": {
          "age_range": [
            27,
            37
          ],
          "requires_working": true,
          "in_taiwan_only": true
        },
        "desc": "出社會打滾幾年後進入第一個職涯高原期。你過往累積的屬性、社團人脈或大學備考基礎，此刻都能派上用場。",
        "options": [
          {
            "key": "network_referral",
            "label": "動用大學社團／同業人脈內推跳槽外商或大廠（需人際 ≥ 68 或曾任社團幹部）",
            "requires_social_or_club": true,
            "effects": {
              "wage_mult": 1.24,
              "social": 5,
              "happiness": 6,
              "flag_set": "referral_promoted"
            }
          },
          {
            "key": "exec_cert_study",
            "label": "利用下班進修專業證照／在職專班（依知識值檢定升遷加薪機率）",
            "effects": {
              "knowledge": 8,
              "health": -4,
              "money_delta_twd_2025": -120000,
              "check_knowledge_promotion": true
            }
          },
          {
            "key": "switch_civil_service",
            "label": "趁還有體力報考高普考／國營事業（若大學曾備考或知識 ≥ 72 上榜率極高）",
            "effects": {
              "attempt_instant_civil_exam": true
            }
          },
          {
            "key": "steady_balance",
            "label": "維持現職步調，把心力留給下班生活與健康",
            "effects": {
              "health": 5,
              "happiness": 4
            }
          }
        ]
      },
      {
        "id": "LS09_midlife_community",
        "stage": "midlife_env",
        "title": "中年生活圈重心：業界商會、家長會還是專注家庭養生？",
        "conditions": {
          "age_range": [
            43,
            54
          ],
          "in_taiwan_only": true
        },
        "desc": "步入不惑之年，你所處的社群與生活圈開始決定你後半生的健康資本與危機支持網。",
        "options": [
          {
            "key": "industry_association",
            "label": "加入同業公會／扶輪社／獅子會拓展人脈與事業機會（人際++、應酬傷身）",
            "effects": {
              "social": 10,
              "wage_mult": 1.1,
              "health": -5,
              "money_delta_twd_2025": -150000
            }
          },
          {
            "key": "fitness_club",
            "label": "加入台灣超夯的登山社／單車環島／馬拉松跑團（健康++、大幅降低中壯年病死率）",
            "effects": {
              "health": 14,
              "happiness": 7,
              "social": 6,
              "midlife_mortality_mult": 0.8
            }
          },
          {
            "key": "quiet_home_saving",
            "label": "減少無效社交，專心陪伴家人並加速累積退休資產",
            "effects": {
              "savings_rate_bonus": 0.05,
              "happiness": 4,
              "social": -2
            }
          }
        ]
      },
      {
        "id": "LS10_retirement_third_life",
        "stage": "retirement_env",
        "title": "退休後的第三人生：社區大學、幫忙帶孫還是環台慢活？",
        "conditions": {
          "age_range": [
            63,
            74
          ],
          "requires_retired_or_65": true,
          "in_taiwan_only": true
        },
        "desc": "卸下數十年的職場重擔，台灣超高齡社會下的退休環境充滿多元選擇，這將決定你晚年的身心品質。",
        "options": [
          {
            "key": "community_college",
            "label": "報名台灣社區大學／樂齡中心學書法攝影並當志工（人際++、健康+、對抗孤老）",
            "effects": {
              "social": 12,
              "happiness": 10,
              "health": 8,
              "knowledge": 5,
              "midlife_mortality_mult": 0.85
            }
          },
          {
            "key": "help_grandkids",
            "label": "幫忙子女接送照顧孫子（僅有子女者可選：親情++、體力消耗）",
            "requires_children": true,
            "effects": {
              "social": 10,
              "happiness": 8,
              "health": -5
            }
          },
          {
            "key": "slow_travel_invest",
            "label": "靠股息年金環台泡溫泉、定期出國賞櫻慢活（幸福++）",
            "effects": {
              "happiness": 14,
              "health": 4,
              "money_delta_ratio": -0.08
            },
            "era_labels": [
              {
                "max_year": 2006,
                "label": "靠退休積蓄搭火車與客運環台泡溫泉、從容慢活（幸福++）"
              },
              {
                "min_year": 2007,
                "label": "靠股息年金搭高鐵環台泡溫泉、定期出國賞櫻慢活（幸福++）"
              }
            ]
          }
        ]
      }
    ]
  },
  "marketHistory": {
    "meta": {
      "schema_version": "1.0.0",
      "coverage_years": [
        1962,
        2026
      ],
      "description": "台灣加權指數（TAIEX）歷年實質史實漲跌幅、盤中最大回撤（融資斷頭依據）、股息殖利率與房價年度漲跌幅。",
      "default_dividend_yield": 0.036,
      "post_2026_stock_mean": 0.032,
      "post_2026_stock_vol": 0.16,
      "post_2026_housing_mean": 0.015,
      "sources": [
        "臺灣證券交易所（TWSE）加權指數歷史統計",
        "Goodinfo! 台灣股市資訊網加權指數歷年漲跌統計（1986–2026）",
        "內政部不動產資訊平台與信義／國泰房價長期趨勢整理"
      ],
      "post_2026_div_yield": 0.03
    },
    "investment_profiles": {
      "deposit": {
        "label": "銀行定存／儲蓄險",
        "beta": 0.0,
        "margin_call_threshold": null
      },
      "index_etf": {
        "label": "台股大盤指數／0050 ETF",
        "beta": 1.0,
        "div_yield": 0.036,
        "margin_call_threshold": null
      },
      "leverage": {
        "label": "融資槓桿／追高飆股",
        "beta": 1.75,
        "div_yield": 0.015,
        "margin_call_threshold": -0.28
      }
    },
    "financial_thresholds_2025": {
      "national_median_household_income": 976700,
      "suburb_price_discount": 0.72,
      "downpayment_ratio_standard": 0.2,
      "downpayment_ratio_new_youth_2023": 0.15,
      "mortgage_max_dti": 0.5,
      "med_advanced_pre_1995": 2400000,
      "med_advanced_post_1995": 750000,
      "child_abroad_full": 2400000,
      "child_abroad_mortgage_equity": 1600000,
      "private_cram_min_salary": 720000,
      "private_cram_min_liquid": 450000,
      "traditional_wedding_cost": 600000,
      "caregiver_min_salary": 420000,
      "caregiver_min_liquid": 350000,
      "forced_sale_cash_trigger": -350000
    },
    "taiex_annual": {
      "1962": {
        "price_pct": 0.08,
        "max_drawdown": -0.1,
        "div_yield": 0.05,
        "housing_pct": 0.04,
        "note": "臺灣證券交易所正式開業，市場草創成交清淡"
      },
      "1963": {
        "price_pct": 0.22,
        "max_drawdown": -0.12,
        "div_yield": 0.05,
        "housing_pct": 0.05,
        "note": "台糖與水泥股領漲，早期散戶開始認識股票"
      },
      "1964": {
        "price_pct": 0.35,
        "max_drawdown": -0.25,
        "div_yield": 0.05,
        "housing_pct": 0.06,
        "note": "台糖股價暴漲後急挫，首度出現早期散戶套牢風波"
      },
      "1965": {
        "price_pct": -0.18,
        "max_drawdown": -0.28,
        "div_yield": 0.05,
        "housing_pct": 0.05,
        "note": "美援終止與台糖股回檔，股市歷經整理"
      },
      "1966": {
        "price_pct": 0.12,
        "max_drawdown": -0.12,
        "div_yield": 0.05,
        "housing_pct": 0.06,
        "note": "加工出口區啟用，工業股逐步穩健回溫"
      },
      "1967": {
        "price_pct": 0.05,
        "max_drawdown": -0.08,
        "housing_pct": 0.06,
        "note": "加權指數以 100 點為基期開編"
      },
      "1968": {
        "price_pct": 0.06,
        "max_drawdown": -0.08,
        "housing_pct": 0.07
      },
      "1969": {
        "price_pct": 0.08,
        "max_drawdown": -0.09,
        "housing_pct": 0.07
      },
      "1970": {
        "price_pct": 0.12,
        "max_drawdown": -0.1,
        "housing_pct": 0.08
      },
      "1971": {
        "price_pct": 0.08,
        "max_drawdown": -0.14,
        "housing_pct": 0.07
      },
      "1972": {
        "price_pct": 0.55,
        "max_drawdown": -0.1,
        "housing_pct": 0.12
      },
      "1973": {
        "price_pct": 1.1,
        "max_drawdown": -0.18,
        "housing_pct": 0.25,
        "note": "第一次石油危機前通膨推升股房大漲"
      },
      "1974": {
        "price_pct": -0.6,
        "max_drawdown": -0.63,
        "housing_pct": -0.05,
        "note": "第一次石油危機，台股腰斬暴跌"
      },
      "1975": {
        "price_pct": 0.7,
        "max_drawdown": -0.15,
        "housing_pct": 0.05
      },
      "1976": {
        "price_pct": 0.12,
        "max_drawdown": -0.15,
        "housing_pct": 0.08
      },
      "1977": {
        "price_pct": 0.2,
        "max_drawdown": -0.12,
        "housing_pct": 0.1
      },
      "1978": {
        "price_pct": 0.18,
        "max_drawdown": -0.18,
        "housing_pct": 0.14
      },
      "1979": {
        "price_pct": 0.03,
        "max_drawdown": -0.2,
        "housing_pct": 0.18,
        "note": "第二次石油危機與台美斷交衝擊"
      },
      "1980": {
        "price_pct": 0.02,
        "max_drawdown": -0.18,
        "housing_pct": 0.15
      },
      "1981": {
        "price_pct": -0.01,
        "max_drawdown": -0.16,
        "housing_pct": 0.04
      },
      "1982": {
        "price_pct": -0.19,
        "max_drawdown": -0.24,
        "housing_pct": -0.03
      },
      "1983": {
        "price_pct": 0.72,
        "max_drawdown": -0.1,
        "housing_pct": 0.03
      },
      "1984": {
        "price_pct": 0.1,
        "max_drawdown": -0.16,
        "housing_pct": 0.04
      },
      "1985": {
        "price_pct": -0.01,
        "max_drawdown": -0.24,
        "housing_pct": 0.02,
        "note": "十信風暴低點 636 點，隨後開啟五年狂潮"
      },
      "1986": {
        "price_pct": 0.244,
        "max_drawdown": -0.1,
        "housing_pct": 0.15,
        "note": "台股首度突破 1,000 點，新台幣升值引熱錢湧入"
      },
      "1987": {
        "price_pct": 1.252,
        "max_drawdown": -0.45,
        "housing_pct": 0.35,
        "note": "台灣錢淹腳目，全年大漲 125%（10 月曾隨美股黑色星期一急殺）"
      },
      "1988": {
        "price_pct": 1.188,
        "max_drawdown": -0.42,
        "housing_pct": 0.4,
        "note": "全年狂飆 118.8%（924 證所稅風暴曾連跌 19 天無量跌停）"
      },
      "1989": {
        "price_pct": 0.88,
        "max_drawdown": -0.18,
        "housing_pct": 0.32,
        "note": "加權指數衝破萬點，台北市房價衝上每坪 25.5 萬高峰"
      },
      "1990": {
        "price_pct": -0.529,
        "max_drawdown": -0.804,
        "housing_pct": -0.18,
        "note": "史詩級泡沫破滅：2 月 12,682 點 8 個月崩跌 80% 至 2,485 點，房市隨之修正"
      },
      "1991": {
        "price_pct": 0.016,
        "max_drawdown": -0.28,
        "housing_pct": -0.06
      },
      "1992": {
        "price_pct": -0.266,
        "max_drawdown": -0.36,
        "housing_pct": -0.04,
        "note": "泡沫餘波與違約交割潮，收盤跌至 3,377 點"
      },
      "1993": {
        "price_pct": 0.798,
        "max_drawdown": -0.16,
        "housing_pct": 0.01
      },
      "1994": {
        "price_pct": 0.174,
        "max_drawdown": -0.18,
        "housing_pct": 0.02
      },
      "1995": {
        "price_pct": -0.274,
        "max_drawdown": -0.37,
        "housing_pct": -0.03,
        "note": "台海飛彈危機與彰化四信擠兌，全年大跌 27.4%"
      },
      "1996": {
        "price_pct": 0.34,
        "max_drawdown": -0.15,
        "housing_pct": 0.0,
        "note": "首度總統直選後利空出盡大漲 34%"
      },
      "1997": {
        "price_pct": 0.181,
        "max_drawdown": -0.31,
        "housing_pct": 0.01,
        "note": "電子股衝上萬點後遇亞洲金融風暴急回"
      },
      "1998": {
        "price_pct": -0.216,
        "max_drawdown": -0.33,
        "housing_pct": -0.04,
        "note": "台灣本土型金融風暴，企業跳票頻傳"
      },
      "1999": {
        "price_pct": 0.316,
        "max_drawdown": -0.18,
        "housing_pct": -0.05,
        "note": "921 震後科技股領軍反彈"
      },
      "2000": {
        "price_pct": -0.439,
        "max_drawdown": -0.55,
        "housing_pct": -0.04,
        "note": "全球網路泡沫破滅，台股全年重挫 43.9%"
      },
      "2001": {
        "price_pct": 0.17,
        "max_drawdown": -0.44,
        "housing_pct": -0.03,
        "note": "911 後跌至 3,411 點十年低谷（高點起算 -66.6%），年底反彈"
      },
      "2002": {
        "price_pct": -0.198,
        "max_drawdown": -0.38,
        "housing_pct": -0.01
      },
      "2003": {
        "price_pct": 0.323,
        "max_drawdown": -0.2,
        "housing_pct": 0.04,
        "note": "SARS 落底後大漲 32.3%，首檔大盤 ETF 0050 成立、房市起漲"
      },
      "2004": {
        "price_pct": 0.042,
        "max_drawdown": -0.24,
        "housing_pct": 0.08
      },
      "2005": {
        "price_pct": 0.067,
        "max_drawdown": -0.13,
        "housing_pct": 0.07
      },
      "2006": {
        "price_pct": 0.195,
        "max_drawdown": -0.16,
        "housing_pct": 0.09
      },
      "2007": {
        "price_pct": 0.087,
        "max_drawdown": -0.22,
        "housing_pct": 0.1
      },
      "2008": {
        "price_pct": -0.46,
        "max_drawdown": -0.577,
        "housing_pct": -0.05,
        "note": "全球金融海嘯與雷曼倒閉，台股重挫 46%（高點起算 -57.7%）"
      },
      "2009": {
        "price_pct": 0.783,
        "max_drawdown": -0.14,
        "housing_pct": 0.08,
        "note": "全球量化寬鬆，台股史詩級大反彈 +78.3%"
      },
      "2010": {
        "price_pct": 0.096,
        "max_drawdown": -0.16,
        "housing_pct": 0.12
      },
      "2011": {
        "price_pct": -0.212,
        "max_drawdown": -0.283,
        "housing_pct": 0.08,
        "note": "歐債危機與美債降評，台股下跌 21.2%"
      },
      "2012": {
        "price_pct": 0.089,
        "max_drawdown": -0.16,
        "housing_pct": 0.07
      },
      "2013": {
        "price_pct": 0.118,
        "max_drawdown": -0.1,
        "housing_pct": 0.09
      },
      "2014": {
        "price_pct": 0.081,
        "max_drawdown": -0.11,
        "housing_pct": 0.06
      },
      "2015": {
        "price_pct": -0.104,
        "max_drawdown": -0.28,
        "housing_pct": -0.02,
        "note": "中國股災外溢，台股一度跌破 7,300 點"
      },
      "2016": {
        "price_pct": 0.11,
        "max_drawdown": -0.1,
        "housing_pct": -0.02
      },
      "2017": {
        "price_pct": 0.15,
        "max_drawdown": -0.06,
        "housing_pct": 0.01,
        "note": "站穩萬點最長紀錄"
      },
      "2018": {
        "price_pct": -0.086,
        "max_drawdown": -0.16,
        "housing_pct": 0.02,
        "note": "美中貿易戰開打，全年回跌 8.6%"
      },
      "2019": {
        "price_pct": 0.233,
        "max_drawdown": -0.09,
        "housing_pct": 0.04,
        "note": "台商回流，台股大漲 23.3%"
      },
      "2020": {
        "price_pct": 0.228,
        "max_drawdown": -0.3,
        "housing_pct": 0.07,
        "note": "疫情三月崩跌 30% 至 8,523 點後強力 V 轉，全年反漲 22.8%"
      },
      "2021": {
        "price_pct": 0.237,
        "max_drawdown": -0.14,
        "housing_pct": 0.11,
        "note": "航運與半導體狂潮，全年大漲 23.7%"
      },
      "2022": {
        "price_pct": -0.224,
        "max_drawdown": -0.32,
        "housing_pct": 0.09,
        "note": "美國暴力升息與通膨衝擊，全年下跌 22.4%"
      },
      "2023": {
        "price_pct": 0.268,
        "max_drawdown": -0.09,
        "housing_pct": 0.07,
        "note": "AI 浪潮與新青安上路，股房齊揚"
      },
      "2024": {
        "price_pct": 0.285,
        "max_drawdown": -0.19,
        "housing_pct": 0.1,
        "note": "台積電領軍突破 24,000 點，全年大漲 28.5%；全國房價所得比創 10.82 倍高點"
      },
      "2025": {
        "price_pct": 0.257,
        "max_drawdown": -0.28,
        "housing_pct": -0.02,
        "note": "4 月對等關稅急殺後隨 AI 出口狂飆 V 轉，全年大漲 25.7% 至 28,963 點"
      },
      "2026": {
        "price_pct": 0.385,
        "max_drawdown": -0.2,
        "housing_pct": 0.01,
        "note": "AI 超級週期推動盤中逼近 5 萬點（49,968.92），全年收漲 38.5%"
      }
    }
  },
  "ambientPeers": {
    "meta": {
      "schema_version": "1.0.0",
      "description": "參照 1in8b.life 設計之『周圍人的時代側影』微故事庫（1950–2080s），以身邊同學、親友與鄰居的切片映照各年代台灣社會結構與日常人情。"
    },
    "vignettes": [
      {
        "id": "AP_1958_girl_stop_school",
        "year_range": [
          1950,
          1967
        ],
        "age_range": [
          10,
          14
        ],
        "relation": "國小同班同學",
        "text": "班上算術總是考最高分的女同學，國小畢業後沒有去考初中。她把借你的鉛筆還回來，小聲說家裡要留錢給弟弟唸書，她得先留在家裡幫忙農事和照顧小妹。",
        "historical_note": "九年國民義務教育尚未實施前，台灣國小畢業生升學率僅約五至六成，女童中斷升學比例顯著高於男童。"
      },
      {
        "id": "AP_1953_land_reform_classmate",
        "year_range": [
          1953,
          1958
        ],
        "age_range": [
          7,
          16
        ],
        "relation": "隔壁村的同學",
        "text": "家裡世世代代租田耕作的同學，這個月突然高興地說，他父親透過耕者有其田終於領到了屬於自己家的田契。放學路上他笑著說，以後收成不用再交一半給地主，家裡終於買得起新書包了。",
        "historical_note": "土地改革後，台灣農村自耕農比例大幅提升，許多農家子弟首度有餘力完成小學甚至升學。"
      },
      {
        "id": "AP_1964_radio_baseball",
        "year_range": [
          1955,
          1974
        ],
        "age_range": [
          7,
          16
        ],
        "relation": "巷口雜貨店鄰居",
        "text": "夏夜吃完晚飯，整條巷子的大人小孩都會搬小板凳擠在雜貨店唯一的黑白電視機與收音機前。只要少棒隊敲出安打，巷口就會爆出一整排歡呼與鞭炮聲。",
        "historical_note": ""
      },
      {
        "id": "AP_1958_kinmen_neighbor_bro",
        "year_range": [
          1958,
          1966
        ],
        "age_range": [
          8,
          25
        ],
        "relation": "巷尾鄰居大哥哥",
        "text": "巷尾的阿明哥入伍抽中金門前線，臨行前全巷鄰居在火車站月台紅著眼眶送行。這兩年他每隔幾週才寄回一封薄薄的家書，信紙上總是反覆寫著「一切平安，勿念」。",
        "historical_note": "八二三砲戰後台海長期對峙，義務役期長達二至三年，外島前線服役成為整代家庭的牽掛。"
      },
      {
        "id": "AP_1962_first_tv_shop",
        "year_range": [
          1962,
          1968
        ],
        "age_range": [
          6,
          20
        ],
        "relation": "街口電器行老闆",
        "text": "台視開播那年，整條街只有電器行門口擺著一台黑白電視機。每天傍晚吃飽飯，大人小孩就自己搬板凳擠在騎樓下看歌仔戲與布袋戲，連巷口的烤番薯攤生意都跟著變好。",
        "historical_note": "1962 年台視開播初期電視機價格等同一般受薪族數月薪水，全巷共看一台電視成為戰後台灣獨有風景。"
      },
      {
        "id": "AP_1968_epz_sister",
        "year_range": [
          1966,
          1981
        ],
        "age_range": [
          12,
          24
        ],
        "relation": "隔壁巷子的大姊",
        "text": "隔壁阿姨的大女兒提著塑膠皮箱搭平快車南下，去高雄加工出口區的電子廠當作業員。她臨走前說，宿舍八個人一間雖然很熱，但領到第一個月薪水要買台電風扇寄回家。",
        "historical_note": "1966 年高雄加工出口區成立，吸引大批年輕女性離鄉投入裝配線，成為台灣外銷經濟起飛的關鍵勞動力。"
      },
      {
        "id": "AP_1977_penpal_emigrate",
        "year_range": [
          1970,
          1992
        ],
        "age_range": [
          7,
          16
        ],
        "relation": "最要好的小學同學",
        "text": "你最要好的小學同學全家要搬到國外去了。臨走前你們在筆記本上抄下彼此的地址；後來你試著寄出幾封航空信，但信件漂洋過海很難送到、回信總隔著好幾個月，久而久之你們漸行漸遠。",
        "historical_note": ""
      },
      {
        "id": "AP_1971_emigrate_doctor_family",
        "year_range": [
          1971,
          1978
        ],
        "age_range": [
          12,
          35
        ],
        "relation": "鎮上診所醫師一家",
        "text": "從小幫你看感冒的診所老醫師，悄悄把房子盤讓給學弟，打算帶著全家移民去美國投靠早年留學的大兒子。大人們在客廳低聲嘆氣，說這幾年局勢動盪，有辦法的人都在替孩子找退路。",
        "historical_note": "1971 年退出聯合國後，台灣出現戰後首波專業中產與留學生海外定居潮。"
      },
      {
        "id": "AP_1981_ee_to_nursing",
        "year_range": [
          1972,
          1996
        ],
        "age_range": [
          16,
          19
        ],
        "relation": "高中好友",
        "text": "你的高中好友數理成績一向名列前茅，一心想上大學電機系；填志願前卻因為是女生，被家裡以「工科太辛苦、當護士比較穩定好嫁人」為由反對，最後被迫改唸護理系。",
        "historical_note": "台灣大專校院工程類科女性比例長期偏低（不足 10%），性別刻板分工深刻左右升學與職涯選擇。"
      },
      {
        "id": "AP_1974_oil_crisis_hoarding",
        "year_range": [
          1974,
          1975
        ],
        "age_range": [
          10,
          50
        ],
        "relation": "菜市場熟識的伯母",
        "text": "物價一天一個價，你看見市場的伯母一次扛了三大袋米和一整箱肥皂衛生紙回家。她一邊喘氣一邊說，沙拉油跟醬油昨天才漲兩成，不先囤一點，下個月薪水根本追不上漲價的速度。",
        "historical_note": "第一次石油危機衝擊下，1974 年台灣物價年增率飆升至 47.5%，為戰後最劇烈的單年通膨。"
      },
      {
        "id": "AP_1985_living_room_factory",
        "year_range": [
          1975,
          1989
        ],
        "age_range": [
          9,
          38
        ],
        "relation": "樓下鄰居一家",
        "text": "樓下鄰居的客廳每晚九點還亮著日光燈，全家老小圍著長桌趕裝聖誕燈泡與塑膠零件。鄰居媽媽笑著說，多趕完兩箱外銷單，下個月就能替孩子買一台新腳踏車。",
        "historical_note": ""
      },
      {
        "id": "AP_1976_campus_folk_senior",
        "year_range": [
          1976,
          1982
        ],
        "age_range": [
          16,
          24
        ],
        "relation": "社團吉他學長",
        "text": "總是背著一把木吉他在草地上彈唱的學長，最近不再只翻唱西洋熱門金曲，開始把新詩譜成中文民歌。他說既然出國留學變容易了，更應該先唱出屬於這塊土地自己的聲音。",
        "historical_note": ""
      },
      {
        "id": "AP_1987_nanyang_cram",
        "year_range": [
          1978,
          1998
        ],
        "age_range": [
          18,
          22
        ],
        "relation": "高中同桌",
        "text": "大學聯考放榜那天，你平時成績很好的同桌差了兩分沒上理想志願。隔週他把厚厚的參考書裝進書包去重考班報到，接下來一整年，同學聚會都沒有人見過他。",
        "historical_note": "大學聯考窄門時期錄取率僅約三至四成，「重考一年」是無數青年的共同青春記憶。"
      },
      {
        "id": "AP_1994_island_military",
        "year_range": [
          1980,
          2003
        ],
        "age_range": [
          20,
          26
        ],
        "relation": "大學死黨",
        "text": "抽中金馬獎去外島當兩年兵的死黨放返台假時，一個人在泡沫紅茶店坐了整個下午。他說營區打投幣電話要排一小時、寫信往返要兩週，最後還是沒熬過這場遠距離。",
        "historical_note": ""
      },
      {
        "id": "AP_1990_stock_crash_aunt",
        "year_range": [
          1990,
          1992
        ],
        "age_range": [
          15,
          65
        ],
        "relation": "菜市場熟識的阿姨",
        "text": "前兩年天天在市場聊明牌、號稱早晚要退休的阿姨，這個月默默把透天厝貼上出售紅紙。大人們壓低聲音說，她在台股萬二崩盤時被斷頭，十幾年的積蓄一夕蒸發。",
        "historical_note": "1990 年台灣加權指數自 12,682 點暴跌 80%，引發全台資產大洗牌與無數家庭負債。"
      },
      {
        "id": "AP_2002_westbound_cousin",
        "year_range": [
          1997,
          2015
        ],
        "age_range": [
          18,
          55
        ],
        "relation": "外派的表哥",
        "text": "去東莞廠當台幹的表哥一年只回台灣四趟。今年除夕夜發紅包時，剛學會走路的小姪子盯著他看了半天，拉著媽媽的衣角怯生生地叫了一聲「叔叔」。",
        "historical_note": "台商西進潮帶動數十萬台灣幹部長期赴中國大陸工作，衍生大量跨海分居家庭。"
      },
      {
        "id": "AP_2006_card_debt_colleague",
        "year_range": [
          2005,
          2007
        ],
        "age_range": [
          24,
          48
        ],
        "relation": "公司前輩",
        "text": "平常總是請大家喝手搖飲的部門前輩突然離職失聯。後來聽人資私下說，他辦了七張現金卡以卡養卡，20% 循環利息滾成還不清的黑洞，連薪水都快被強制扣押。",
        "historical_note": "雙卡風暴席捲全台，數十萬名持卡人深陷 20% 高利循環卡債困境。"
      },
      {
        "id": "AP_2014_civil_exam_friend",
        "year_range": [
          2008,
          2019
        ],
        "age_range": [
          22,
          35
        ],
        "relation": "前同事",
        "text": "辭職全職準備高普考兩年的前同事，今年放榜又差了零點八分落榜。他在電話裡沉默很久才問你：「如果再考一年還是沒上，我三十歲回民間企業還找得到工作嗎？」",
        "historical_note": ""
      },
      {
        "id": "AP_2009_22k_roommate",
        "year_range": [
          2009,
          2012
        ],
        "age_range": [
          22,
          29
        ],
        "relation": "大學室友",
        "text": "大學室友畢業後投了六十封履歷，最後領著剛好兩萬二的起薪，在台北租了一間沒對外窗的頂樓加蓋。他在 MSN 上苦笑說，扣完房租和學貸，連感冒都不敢請病假。",
        "historical_note": "2009 年金融海嘯期間台灣失業率達 5.85%，企業實習 22K 方案意外形成青年起薪定錨效應。"
      },
      {
        "id": "AP_2017_australia_friend",
        "year_range": [
          2009,
          2019
        ],
        "age_range": [
          21,
          32
        ],
        "relation": "專科同學",
        "text": "去澳洲打工度假的同學在臉書發了一張在農場摘草莓的照片，雙手曬得黝黑卻笑得很燦爛。他說雖然切肉與採果很累，但一年存下的錢已經超過他在台灣做三年的積蓄。",
        "historical_note": "2004 年台澳打工度假開放後，累計逾二十萬名台灣青年赴澳工作存第一桶金。"
      },
      {
        "id": "AP_2022_return_home_friend",
        "year_range": [
          2016,
          2032
        ],
        "age_range": [
          28,
          46
        ],
        "relation": "同鄉北漂好友",
        "text": "和你一起北上打拚十年的同鄉好友決定搬回南部老家了。他說在北部租了十年房依舊追不上頭期款，回去薪水少兩成，但至少下班騎車十分鐘就能吃到家裡的熱湯。",
        "historical_note": "人力銀行調查顯示，約 68.6% 北漂族曾動念返鄉，但有 67.6% 因顧慮薪資打折而反覆掙扎。"
      },
      {
        "id": "AP_2019_equal_marriage",
        "year_range": [
          2019,
          2028
        ],
        "age_range": [
          22,
          55
        ],
        "relation": "多年摯友",
        "text": "相伴十年的大學好友終於和伴侶去戶政事務所登記結婚了。婚宴只請了幾桌最親近的親友，交換誓詞時，你看見她原本沉默反對多年的父親偷偷拭去眼角的淚。",
        "historical_note": "2019 年 5 月台灣同性婚姻專法正式施行，成為亞洲第一個同性婚姻合法化國家。"
      },
      {
        "id": "AP_2024_uni_closed_friend",
        "year_range": [
          2022,
          2036
        ],
        "age_range": [
          20,
          48
        ],
        "relation": "昔日社團夥伴",
        "text": "友校的社團老朋友傳來一張照片——他們母校大門口的校名拆掉了一半，以前下課總排到巷口的雞排攤，這個學期也跟著拉下鐵門了。",
        "historical_note": ""
      },
      {
        "id": "AP_2026_caregiver_neighbor",
        "year_range": [
          2025,
          2050
        ],
        "age_range": [
          45,
          80
        ],
        "relation": "公園晨運球友",
        "text": "每天清晨在公園一起打羽球的陳大哥已經兩個月沒來。鄰居說他太太失智惡化，唯一的女兒在北部上班抽不開身，他只好把球拍收起來，整天守在家裡獨自照料。",
        "historical_note": "台灣於 2025 年正式邁入超高齡社會，65 歲以上人口占比突破 20%。"
      },
      {
        "id": "AP_2035_ai_retrain_friend",
        "year_range": [
          2029,
          2048
        ],
        "age_range": [
          25,
          55
        ],
        "relation": "前部門同事",
        "text": "過去總幫客戶畫商業簡報與修圖的前同事，這兩年轉行考了高齡體適能指導員。她笑說，AI 幾秒就能生成一百張圖，但握著長輩的手帶他們伸展，螢幕怎麼樣都取代不了。",
        "historical_note": ""
      },
      {
        "id": "AP_2045_small_school",
        "year_range": [
          2036,
          2085
        ],
        "age_range": [
          35,
          88
        ],
        "relation": "老鄰居的孫子",
        "text": "聽老鄰居聊起，他孫子就讀的百年國小今年全校新生只剩九個人；街口以前擠滿安親班與文具店的那排透天厝，如今一半都改成了社區日照中心與復健診所。",
        "historical_note": "依國發會中推估趨勢，台灣高齡人口占比將逐步朝近半數邁進。"
      }
    ]
  },
  "futureForecasts": {
    "meta": {
      "schema_version": "1.0.0",
      "label": "台灣未來預測",
      "description": "針對 2027 年以後之虛構推演事件庫，比照『台灣歷史現場』三段式格式呈現，透過世界線狀態旗標與互斥分支確保隨機觸發同時維持前後邏輯一致，並實際影響玩家薪資、資產、健康與生活支出。"
    },
    "events": [
      {
        "id": "FF_2027_ai_white_collar_4day",
        "year_range": [
          2027,
          2030
        ],
        "probability": 0.42,
        "category": "ai_economy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "ai_automation_wave"
        ],
        "title": "AI 代理全面進駐辦公室：『週休三日試辦』與白領轉型潮",
        "summary": "生成式與代理型 AI 迅速接管台灣企業的行政、翻譯、客服與初階程式作業。科技與外商大廠率先推行週休三日與混合辦公，但基層文書與傳統服務業出現結構性縮編，勞資展開技能重塑與工時分配激辯。",
        "institutional_aftermath": "勞動部將『AI 協作技能訓練』納入常態就業保險補助，並開啟工時彈性化與遠距工作法制化討論。",
        "trend_basis": "虛構推演 · 延伸自 2025–2026 年台灣 AI 出口占比衝上七成與全球生成式 AI 職場導入趨勢。",
        "cultural_footnote_en": "Fictional forecast: Autonomous AI agents reshape Taiwanese white-collar jobs, triggering a split between flexible 4-day tech workweeks and clerical retraining pressure.",
        "gameplay_impact": {
          "tech_wage_mult": 1.09,
          "non_tech_wage_mult": 0.96,
          "unlock_remote_if_tech": true,
          "happiness_delta": 2,
          "knowledge_delta": 3
        }
      },
      {
        "id": "FF_2028_heatwave_law",
        "year_range": [
          2028,
          2033
        ],
        "probability": 0.36,
        "category": "climate_energy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "extreme_heat_normal"
        ],
        "title": "百年級酷暑來襲：『高溫假』入法與夏季 40°C 新常態",
        "summary": "聖嬰現象疊加全球暖化，台北盆地與花東縱谷連日突破 40°C，戶外營建、外送與農漁勞動者熱傷害病例激增。立法院三讀增訂『極端高溫勞動保護與彈性停班條款』，夏季尖峰用電與冷氣電費同步攀升。",
        "institutional_aftermath": "新建案強制納入遮陽隔熱與節能標章，各縣市廣設免費社區避暑中心與高齡獨居關懷降溫巡訪。",
        "trend_basis": "虛構推演 · 延伸自氣象署近年台灣夏季高溫日數持續創新高與全球暖化升溫路徑。",
        "cultural_footnote_en": "Fictional forecast: Sustained 40°C summer heatwaves lead Taiwan to codify heat-leave labor protections and urban cooling shelters.",
        "gameplay_impact": {
          "living_cost_mult": 1.03,
          "health_delta": -2,
          "happiness_delta": -2
        }
      },
      {
        "id": "FF_2028_care4_robots",
        "year_range": [
          2027,
          2032
        ],
        "probability": 0.4,
        "category": "demographics_care",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "care_tech_adopted"
        ],
        "title": "長照 4.0 上路：AI 照護輔具與陪伴機器人納入部分給付",
        "summary": "面對 65 歲以上人口快速逼近四分之一與移工看護荒，台灣結合 ICT 與醫材產業推出『長照 4.0』，將防跌感測、移位外骨骼與台語／客語 AI 陪伴終端納入長照補助，大幅減輕家庭夜間看顧負擔。",
        "institutional_aftermath": "銀髮科技成為台灣繼半導體後的新興出口兆元產業，社區日照中心全面導入遠距生理監測。",
        "trend_basis": "虛構推演 · 延伸自 2025 年台灣邁入超高齡社會與長照人力缺口趨勢。",
        "cultural_footnote_en": "Fictional forecast: Leveraging its ICT supply chain, Taiwan launches Long-Term Care 4.0 subsidizing assistive robotics and Taiwanese-speaking care companions.",
        "gameplay_impact": {
          "care_cost_mult": 0.78,
          "health_delta_elder": 4,
          "happiness_delta": 3
        }
      },
      {
        "id": "FF_2029_social_housing_500k",
        "year_range": [
          2029,
          2035
        ],
        "probability": 0.34,
        "category": "housing_finance",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "housing_reform_passed"
        ],
        "title": "空屋稅改革與『社宅＋包租代管 50 萬戶』方案落地",
        "summary": "在長年高房價與高齡租屋歧視壓力下，中央與六都推動全國歸戶空屋累進稅，並透過公私協力擴充社會住宅與『銀髮友善租屋認證』，讓無房青年與獨居長者的居住安全網明顯改善。",
        "institutional_aftermath": "租屋市場透明度與定型化契約查核大幅提高，房東拒租 65 歲以上長者納入明確反歧視裁罰。",
        "trend_basis": "虛構推演 · 延伸自台灣高房價所得比、空屋率與超高齡租屋保障倡議。",
        "cultural_footnote_en": "Fictional forecast: Progressive vacancy taxes and 500,000 social/managed rental units ease rent burdens and curb discrimination against elderly tenants.",
        "gameplay_impact": {
          "rent_cost_mult": 0.88,
          "clear_elderly_rent_risk": true,
          "happiness_delta": 4
        }
      },
      {
        "id": "FF_2030_ring_rail_east",
        "year_range": [
          2029,
          2036
        ],
        "probability": 0.32,
        "category": "society_infra",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "ring_transit_upgraded"
        ],
        "title": "東部快鐵提速與自駕接駁串聯：台灣『一日生活圈 2.0』成形",
        "summary": "歷經多年邊坡防災工程與電氣化雙軌提速，加上花東偏鄉導入無人自駕接駁公車與高鐵延伸線完工，西部都會與花東之間的通勤與醫療轉診時間大幅縮短，掀起一股『移居東部遠距工作』風潮。",
        "institutional_aftermath": "花東與雲嘉南不再僅依賴假日觀光，遠距工作聚落與地區醫療可近性顯著提升。",
        "trend_basis": "虛構推演 · 延伸自台鐵公司化後東部交通韌性投資與高鐵延伸規劃討論。",
        "cultural_footnote_en": "Fictional forecast: Upgraded eastern express rail and autonomous shuttles shrink Taiwan's east-west divide, fueling remote-work migration to Hualien and Taitung.",
        "gameplay_impact": {
          "region_bonus_ids": [
            "east_islands",
            "south_tainan",
            "south_kaohsiung"
          ],
          "region_wage_mult": 1.08,
          "happiness_delta": 3,
          "health_delta_east": 3
        }
      },
      {
        "id": "FF_2031_uni_community_hub",
        "year_range": [
          2030,
          2036
        ],
        "probability": 0.35,
        "category": "demographics_care",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "uni_consolidation_done"
        ],
        "title": "大學退場整併潮尾聲：閒置校區轉型『樂齡共居與社區學院』",
        "summary": "少子化海嘯席捲高教十年後，全台大專校院整併至百所以下。政府與地方攜手將多所退場私校改建為結合技職微學程、長照日托與青年共創基地的『全齡學習園區』，老校舍重現生機。",
        "institutional_aftermath": "高等教育從文憑導向轉為終身學習與跨域證照並行，40 歲以上重返校園進修成為常態。",
        "trend_basis": "虛構推演 · 延伸自 2022–2026 年少子化大專招生缺額與私校退場條例趨勢。",
        "cultural_footnote_en": "Fictional forecast: Following a wave of university closures from low birth rates, former campuses are repurposed into lifelong learning and intergenerational co-living hubs.",
        "gameplay_impact": {
          "knowledge_delta": 4,
          "happiness_delta": 2
        }
      },
      {
        "id": "FF_2031_silicon_shield_2",
        "year_range": [
          2031,
          2037
        ],
        "probability": 0.35,
        "category": "ai_economy",
        "regions": [
          "ALL"
        ],
        "mutually_exclusive_group": "semi_trajectory_2030s",
        "sets_world_flags": [
          "silicon_boom_2"
        ],
        "title": "矽盾 2.0 突破：台灣率先量產次世代矽光子與低功耗量子運算晶片",
        "summary": "新竹、台中與台南科學園區聯手突破次世代矽光子封裝瓶頸，全球資料中心與人形機器人供應鏈高度仰賴台灣生態系。出口順差與外資買盤再度推升台股，但也進一步拉大科技與非科技產業薪資落差。",
        "institutional_aftermath": "政府成立主權科技人才基金並推動跨產業利潤分享稅制，試圖緩解『單一引擎』結構風險。",
        "trend_basis": "虛構推演 · 延伸自台灣先進製程與矽光子封裝研發聚落優勢（與『供應鏈去中心化』為互斥平行世界線）。",
        "cultural_footnote_en": "Fictional forecast (Branch A): Breakthrough mass production in silicon photonics extends Taiwan's semiconductor boom, lifting equities while widening sector wage gaps.",
        "gameplay_impact": {
          "stock_shock_pct": 0.16,
          "tech_wage_mult": 1.12,
          "happiness_delta": 2
        }
      },
      {
        "id": "FF_2031_semi_decentralize",
        "year_range": [
          2031,
          2037
        ],
        "probability": 0.35,
        "category": "ai_economy",
        "regions": [
          "ALL"
        ],
        "mutually_exclusive_group": "semi_trajectory_2030s",
        "sets_world_flags": [
          "post_semi_pivot"
        ],
        "title": "全球晶圓製造去中心化衝擊：台灣啟動『軟體、生醫與綠能二次轉型』",
        "summary": "美、歐、日、印海外晶圓廠陸續量產加上全球關稅壁壘重塑，台灣純代工出口占比出現歷史性滑落，台股歷經劇烈估值修正。陣痛之餘，產官學加速將資金與工程師轉往 AI 軟體、精準生醫與海洋綠能。",
        "institutional_aftermath": "台灣經濟逐步擺脫對單一硬體製造的過度依賴，中小企業與服務業薪資結構迎來重新定價。",
        "trend_basis": "虛構推演 · 延伸自 2025 年對等關稅與全球半導體在地化建廠壓力（與『矽盾 2.0』為互斥平行世界線）。",
        "cultural_footnote_en": "Fictional forecast (Branch B): Overseas fab expansion cools Taiwan's hardware export dominance, triggering a painful stock correction that accelerates a pivot to software and biotech.",
        "gameplay_impact": {
          "stock_shock_pct": -0.14,
          "tech_wage_mult": 0.93,
          "non_tech_wage_mult": 1.05,
          "happiness_delta": -3
        }
      },
      {
        "id": "FF_2032_mrna_cancer_nhi",
        "year_range": [
          2031,
          2038
        ],
        "probability": 0.36,
        "category": "biotech_health",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "cancer_vaccine_nhi"
        ],
        "title": "個人化 mRNA 癌症疫苗納入健保：多數實體癌轉為可控制慢性病",
        "summary": "隨著 AI 蛋白質折疊設計與國內生技代工成熟，針對肺癌、大腸癌與肝癌的個人化 mRNA 療法成本驟降九成，健保署正式納入給付。過去令家庭聞之色變的重大傷病天價自費壓力大幅緩解。",
        "institutional_aftermath": "國人平均健康餘命顯著拉長，健保財務改以精準預防篩檢取代末期高昂醫療支出。",
        "trend_basis": "虛構推演 · 延伸自 mRNA 癌症疫苗臨床進展與台灣健保新藥納保制度。",
        "cultural_footnote_en": "Fictional forecast: Personalized mRNA cancer vaccines enter Taiwan's National Health Insurance, turning major cancers into manageable chronic conditions.",
        "gameplay_impact": {
          "health_delta": 6,
          "happiness_delta": 4,
          "mortality_mult": 0.88
        }
      },
      {
        "id": "FF_2033_energy_breakthrough",
        "year_range": [
          2032,
          2039
        ],
        "probability": 0.34,
        "category": "climate_energy",
        "regions": [
          "ALL"
        ],
        "mutually_exclusive_group": "energy_path_2030s",
        "sets_world_flags": [
          "clean_baseload_ready"
        ],
        "title": "深層地熱與次世代潔淨基載商轉：台灣穩住 AI 算力與淨零供電",
        "summary": "宜蘭、花東深層增強型地熱電廠與高密度電網級儲能陸續併網，配合次世代潔淨基載電力通過嚴格耐震審查商轉，長年困擾產業與民生的缺電與碳費焦慮終於獲得緩解。",
        "institutional_aftermath": "台灣順利銜接歐美碳邊境稅（CBAM）標準，工業與民生電價漲勢趨緩。",
        "trend_basis": "虛構推演 · 延伸自台灣地熱資源探勘、儲能建設與淨零基載能源討論（與『電價陣痛期』互斥）。",
        "cultural_footnote_en": "Fictional forecast (Branch A): Deep geothermal and next-generation clean baseload power stabilize Taiwan's grid for AI data centers and net-zero export compliance.",
        "gameplay_impact": {
          "living_cost_mult": 0.96,
          "happiness_delta": 3,
          "stock_shock_pct": 0.06
        }
      },
      {
        "id": "FF_2033_grid_strain",
        "year_range": [
          2032,
          2039
        ],
        "probability": 0.34,
        "category": "climate_energy",
        "regions": [
          "ALL"
        ],
        "mutually_exclusive_group": "energy_path_2030s",
        "sets_world_flags": [
          "energy_cost_surge"
        ],
        "title": "能源轉型與算力搶電陣痛：夏季尖峰階梯電價大調漲",
        "summary": "AI 資料中心耗電飆升疊加極端酷暑與儲能建置延宕，台電面對龐大燃料與電網韌性投資缺口，正式啟用『分時高倍數尖峰電價』與工業需量競價，民生冷氣費與外食物價同步上揚。",
        "institutional_aftermath": "家戶屋頂光電＋社區微電網成為新建案標配，節能家電汰換補貼全面擴大。",
        "trend_basis": "虛構推演 · 延伸自 AI 用電成長與能源轉型投資成本壓力（與『潔淨基載商轉』互斥）。",
        "cultural_footnote_en": "Fictional forecast (Branch B): Surging AI power demand and extreme heat strain Taiwan's grid, leading to steep peak-hour electricity tariffs and higher living costs.",
        "gameplay_impact": {
          "living_cost_mult": 1.07,
          "happiness_delta": -3
        }
      },
      {
        "id": "FF_2034_housing_divergence",
        "year_range": [
          2033,
          2041
        ],
        "probability": 0.32,
        "category": "housing_finance",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "housing_k_shape"
        ],
        "title": "少子化反轉房市結構：『蛋黃抗跌、老舊無電梯公寓加速折價』",
        "summary": "繼承移轉量首度超越新成屋交易，台灣房市告別『閉眼買都漲』的黃金世代。捷運與醫療資源集中的核心電梯社區依然保值，但缺乏電梯的五十年老舊公寓與偏遠蛋白區出現明顯滯銷與都更整合潮。",
        "institutional_aftermath": "政府推行『公辦都更一條龍』與危險老屋強制健檢，置產觀念從囤房轉向重視現金流與長照機能。",
        "trend_basis": "虛構推演 · 延伸自台灣屋齡老化（逾半住宅超過 30 年）與人口自然負成長趨勢。",
        "cultural_footnote_en": "Fictional forecast: Inheritance transfers overtake new home sales, splitting Taiwan's property market between resilient transit-hub high-rises and discounting walk-up apartments.",
        "gameplay_impact": {
          "housing_divergence": true,
          "happiness_delta": 1
        }
      },
      {
        "id": "FF_2035_new_immigrants_pr",
        "year_range": [
          2034,
          2042
        ],
        "probability": 0.34,
        "category": "demographics_care",
        "regions": [
          "ALL"
        ],
        "mutually_exclusive_group": "labor_shortage_path",
        "sets_world_flags": [
          "multicultural_taiwan"
        ],
        "title": "『新移民與資深移工永居法』上路：台灣邁向多元族群新社會",
        "summary": "面對營建、製造、餐飲與長照全面缺工，台灣正式開放中階技術移工與東南亞白領在台滿一定年限可攜眷申請永居與歸化。街頭招牌、校園雙語與社區文化更加多元，服務業缺工危機獲得顯著緩解。",
        "institutional_aftermath": "台灣成為東亞最開放的新移民友善社會之一，新二代與多元母語成為區域經貿橋樑。",
        "trend_basis": "虛構推演 · 延伸自國發會留才久用方案與勞動力萎縮現實（與『延退 70 歲』為互斥路線）。",
        "cultural_footnote_en": "Fictional forecast (Branch A): Taiwan enacts broad permanent residency pathways for skilled and long-term migrant workers, easing labor shortages and reshaping urban culture.",
        "gameplay_impact": {
          "care_cost_mult": 0.85,
          "living_cost_mult": 0.97,
          "social_delta": 5,
          "happiness_delta": 3
        }
      },
      {
        "id": "FF_2035_retire_70_reform",
        "year_range": [
          2034,
          2042
        ],
        "probability": 0.34,
        "category": "demographics_care",
        "regions": [
          "ALL"
        ],
        "mutually_exclusive_group": "labor_shortage_path",
        "sets_world_flags": [
          "silver_workforce_70"
        ],
        "title": "勞動力斷層與勞保財務改革：『彈性延退至 70 歲』修法通過",
        "summary": "在移民政策保守與青壯人口驟減下，勞保基金面臨提早見底危機。立法院通過年金漸進改革，鼓勵企業聘用 65–70 歲銀髮族擔任顧問與半日班，同時調整勞保費率與法定全額請領年齡。",
        "institutional_aftermath": "『60 歲退休』走入歷史，台灣職場全面改裝無障礙與高齡友善工時，熟齡再就業成為常態。",
        "trend_basis": "虛構推演 · 延伸自台灣勞保潛藏負債與高齡勞動參與率攀升趨勢（與『新移民永居法』互斥）。",
        "cultural_footnote_en": "Fictional forecast (Branch B): Facing pension insolvency and acute worker shortages, Taiwan raises pension benchmarks and normalizes flexible employment up to age 70.",
        "gameplay_impact": {
          "wage_mult": 1.03,
          "happiness_delta": -3,
          "social_delta": 2
        }
      },
      {
        "id": "FF_2036_leo_satellite_resilience",
        "year_range": [
          2035,
          2044
        ],
        "probability": 0.32,
        "category": "society_infra",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "digital_resilience_net"
        ],
        "title": "低軌衛星直連手機普及：『全民數位與防災韌性網』全面上線",
        "summary": "鑑於海底電纜易受地震與船錨事故干擾，台灣完成多軌衛星與自主微衛星通訊備援網，一般手機即使在高山、離島或強震斷網時也能直連求救與接收災防訊息，大幅提升全島通訊與緊急救援效率。",
        "institutional_aftermath": "離島與山區遠距醫療、氣象監測不再出現訊號死角，成為全球海島國家韌性治理典範。",
        "trend_basis": "虛構推演 · 延伸自近年台灣低軌衛星備援測試與全社會防災韌性政策。",
        "cultural_footnote_en": "Fictional forecast: Direct-to-cell low-Earth-orbit satellite backups eliminate dead zones across Taiwan's mountains and outer islands during earthquakes and typhoons.",
        "gameplay_impact": {
          "happiness_delta": 3,
          "mortality_mult": 0.96
        }
      },
      {
        "id": "FF_2037_coastal_sponge_city",
        "year_range": [
          2036,
          2046
        ],
        "probability": 0.3,
        "category": "climate_energy",
        "regions": [
          "ALL"
        ],
        "requires_world_flags": [
          "extreme_heat_normal"
        ],
        "sets_world_flags": [
          "sponge_city_built"
        ],
        "title": "極端暴雨與海平面上升：西南沿海與蘭陽啟動『海綿城市大改造』",
        "summary": "強降雨屢破歷史時雨量紀錄，雲嘉南、高屏沿海低窪區與蘭陽平原啟動十年防洪重劃——將部分易淹農地轉為滯洪生態濕地與高腳防災社區，同時推動全島地下雨撲滿與透水鋪面。",
        "institutional_aftermath": "保險業導入氣候風險分級保費，地勢與排水韌性成為台灣人看房與定居的新關鍵指標。",
        "trend_basis": "虛構推演 · 延伸自極端強降雨與台灣西南沿海地層下陷防治課題。",
        "cultural_footnote_en": "Fictional forecast: Extreme cloudbursts and sea-level rise prompt coastal wetland retention zones and 'sponge city' retrofits across southwestern Taiwan and Yilan.",
        "gameplay_impact": {
          "region_housing_shock_ids": [
            "south_tainan",
            "south_kaohsiung",
            "east_islands"
          ],
          "region_housing_shock_pct": -0.06,
          "health_delta": 1
        }
      },
      {
        "id": "FF_2038_cbdc_antiscam",
        "year_range": [
          2037,
          2045
        ],
        "probability": 0.34,
        "category": "housing_finance",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "cbdc_ai_antiscam"
        ],
        "title": "數位新台幣（CBDC）上線與『AI 零時差反詐防火牆』",
        "summary": "中央銀行歷經多年試驗後推出可程式化『數位新台幣』，並整合電信與銀行端 AI 異常金流攔截網。人頭帳戶與假投資詐騙案量在兩年內銳減七成，高齡長者的退休金防線顯著加固。",
        "institutional_aftermath": "實體紙鈔流通量減半，但社會也同步針對數位隱私權與『保留現金支付自由』立法設立紅線。",
        "trend_basis": "虛構推演 · 延伸自央行數位貨幣試驗與 2024–2025 年台灣打詐法制化進程。",
        "cultural_footnote_en": "Fictional forecast: Taiwan's digital NTD (CBDC) paired with real-time AI anti-fraud interception slashes investment scams by 70%, while spurring privacy safeguards.",
        "gameplay_impact": {
          "reduce_scam_risk": true,
          "happiness_delta": 3,
          "knowledge_delta": 2
        }
      },
      {
        "id": "FF_2039_ai_tax_ubi_pilot",
        "year_range": [
          2038,
          2048
        ],
        "probability": 0.35,
        "category": "ai_economy",
        "regions": [
          "ALL"
        ],
        "requires_world_flags": [
          "ai_automation_wave"
        ],
        "sets_world_flags": [
          "ubi_safety_net"
        ],
        "title": "自動化算力稅與『全民基本轉型津貼（UBI 試點）』啟動",
        "summary": "隨著 AI 與無人化系統創造的產值高度集中於少數大型企業，台灣在歷經多年財稅辯論後開徵『自動化算力與資料紅利稅』，優先發放給待業、全職照顧者與低所得家戶作為基本生活安全網。",
        "institutional_aftermath": "工作不再是維持生存的唯一條件，社區照護、藝術創作與公民參與的社會價值獲得重新肯定。",
        "trend_basis": "虛構推演 · 依賴前置事件『AI 代理進駐辦公室』，延伸自全球 AI 稅與基本收入政策討論。",
        "cultural_footnote_en": "Fictional forecast: Following widespread AI automation, Taiwan taxes automated compute dividends to fund a targeted Universal Basic Transition stipend.",
        "gameplay_impact": {
          "cash_subsidy_2025": 180000,
          "happiness_delta": 5
        }
      },
      {
        "id": "FF_2041_culture_wave_export",
        "year_range": [
          2040,
          2052
        ],
        "probability": 0.3,
        "category": "society_infra",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "tw_culture_softpower"
        ],
        "title": "『台流內容』與沉浸式華語文化出海潮：文創與遊戲業迎來黃金期",
        "summary": "憑藉開放自由的創作環境與 AI 跨語系即時在地化工具，台灣原創影視、獨立遊戲與歷史文化 IP 席捲歐美與亞洲串流平台，原本長期低薪的文史設計與數位內容產業薪資明顯翻身。",
        "institutional_aftermath": "文組與跨領域創作者擺脫『畢業即低薪』標籤，文化觀光成為台灣最具辨識度的國際名片。",
        "trend_basis": "虛構推演 · 延伸自台灣自由創作環境、獨立遊戲與文化內容產業出海潛力。",
        "cultural_footnote_en": "Fictional forecast: Aided by AI localization and creative freedom, Taiwanese films, indie games, and design IPs surge globally, lifting humanities and creative wages.",
        "gameplay_impact": {
          "non_tech_wage_mult": 1.1,
          "happiness_delta": 4,
          "social_delta": 3
        }
      },
      {
        "id": "FF_2044_dementia_gene_therapy",
        "year_range": [
          2042,
          2054
        ],
        "probability": 0.35,
        "category": "biotech_health",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "dementia_breakthrough"
        ],
        "title": "阿茲海默與失智症早期基因療法問世：三明治世代迎來喘息",
        "summary": "跨國與台灣神經醫學團隊合作研發的早期神經修復療法獲批納入健保專案，能將輕度認知障礙的惡化速度延緩七成以上。原本面臨崩潰的高齡失智照護體系迎來歷史性轉折。",
        "institutional_aftermath": "75 歲以上長者維持獨立自理生活的比例大幅提高，中高齡被迫離職照護的悲劇顯著減少。",
        "trend_basis": "虛構推演 · 延伸自神經退化性疾病療法進展與超高齡台灣最大的長照痛點。",
        "cultural_footnote_en": "Fictional forecast: Early-stage gene therapy slows Alzheimer's progression by over 70%, bringing immense relief to Taiwan's sandwich-generation caregivers.",
        "gameplay_impact": {
          "care_cost_mult": 0.72,
          "health_delta_elder": 6,
          "happiness_delta": 5
        }
      },
      {
        "id": "FF_2048_compact_towns",
        "year_range": [
          2046,
          2060
        ],
        "probability": 0.32,
        "category": "demographics_care",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "compact_towns_era"
        ],
        "title": "人口跌破 1,900 萬：全島『精簡城鎮』重劃與無人機醫療物流網",
        "summary": "台灣總人口如預期滑落至 1,900 萬以下，許多偏遠村落邁入自然整併。各縣市不再盲目擴張重劃區，而是將公共設施集中於『精簡核心城鎮』，偏鄉改由常態化無人機配送藥品、生鮮與遠距巡診車服務。",
        "institutional_aftermath": "大片退耕與空置坡地回歸自然復育，台灣山林生態與生物多樣性意外迎來百年最佳恢復期。",
        "trend_basis": "虛構推演 · 延伸自國發會 2024–2070 人口中推估路徑與空間治理轉型。",
        "cultural_footnote_en": "Fictional forecast: As Taiwan's population dips below 19 million, counties pivot to 'compact town' hubs served by medical drones while rural hillsides rewild.",
        "gameplay_impact": {
          "living_cost_mult": 0.98,
          "health_delta": 2,
          "happiness_delta": 1
        }
      },
      {
        "id": "FF_2054_holo_remote_work",
        "year_range": [
          2052,
          2068
        ],
        "probability": 0.32,
        "category": "ai_economy",
        "regions": [
          "ALL"
        ],
        "requires_world_flags": [
          "ai_automation_wave"
        ],
        "sets_world_flags": [
          "post_northbound_era"
        ],
        "title": "全息協作與空間運算普及：『北漂時代終結』與跨縣市同酬化",
        "summary": "輕量化空間運算眼鏡與低延遲全息會議徹底抹平實體辦公距離，台北與竹科企業全面開放『全島任意縣市遠距正職』。許多年輕人選擇在彰化、台南或花蓮老家就能領取都會區薪資，長達半世紀的北漂潮正式反轉。",
        "institutional_aftermath": "南北房價所得比差距明顯收斂，地方創生與社區生活品質取代通勤時間成為選居首要條件。",
        "trend_basis": "虛構推演 · 依賴『AI 辦公室轉型』，延伸自遠距工作演進與台灣區域均衡發展願景。",
        "cultural_footnote_en": "Fictional forecast: Holographic spatial collaboration ends half a century of 'northbound migration' to Taipei, letting workers earn metro salaries from hometowns islandwide.",
        "gameplay_impact": {
          "unlock_remote_all": true,
          "region_bonus_ids": [
            "central",
            "south_tainan",
            "south_kaohsiung",
            "east_islands"
          ],
          "region_wage_mult": 1.12,
          "happiness_delta": 4
        }
      },
      {
        "id": "FF_2060_solo_cohousing",
        "year_range": [
          2055,
          2075
        ],
        "probability": 0.34,
        "category": "society_infra",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "solo_society_ethics"
        ],
        "title": "一人戶突破四成：『跨世代共居宅』與法制化意定監護普及",
        "summary": "不婚、頂客與高齡獨居使台灣單人家庭成為最大戶型。傳統以血緣為中心的家庭觀徹底轉型，好友合資共老宅、青銀共居社區與預設『意定監護＋安寧信託』成為法律與社會日常，獨老不再等同孤立無援。",
        "institutional_aftermath": "民法與醫療法大幅放寬『非血緣緊急醫療代理人』權限，重新定義二十一世紀中葉的台灣家人關係。",
        "trend_basis": "虛構推演 · 延伸自台灣一人戶占比持續攀升與意定監護制度發展。",
        "cultural_footnote_en": "Fictional forecast: With single-person households exceeding 40%, chosen-family co-housing and legal healthcare proxies redefine aging in mid-century Taiwan.",
        "gameplay_impact": {
          "social_delta": 7,
          "happiness_delta": 5
        }
      },
      {
        "id": "FF_2064_organ_regen_100yr",
        "year_range": [
          2058,
          2082
        ],
        "probability": 0.34,
        "category": "biotech_health",
        "regions": [
          "ALL"
        ],
        "requires_world_flags": [
          "cancer_vaccine_nhi"
        ],
        "sets_world_flags": [
          "century_lifespan_era"
        ],
        "title": "幹細胞器官再生臨床普及：台灣正式跨入『百歲健康人生』時代",
        "summary": "自體幹細胞 3D 生物列印修復心肌、腎臟與關節軟骨技術成熟，台灣平均壽命突破 90 歲大關。然而長壽也意味著退休準備期拉長至三十年以上，『多段式職涯（讀書→工作→休耕→再創業）』取代傳統單線人生。",
        "institutional_aftermath": "勞退與年金制度全面導入『百歲長壽年金池』，高齡社會的重心從延命轉向維持生活意義。",
        "trend_basis": "虛構推演 · 依賴『癌症慢性病化』前置突破，延伸自再生醫學與台灣長壽趨勢。",
        "cultural_footnote_en": "Fictional forecast: Stem-cell organ regeneration pushes Taiwanese life expectancy past 90, turning single-track retirement into multi-stage 100-year careers.",
        "gameplay_impact": {
          "health_delta": 7,
          "mortality_mult": 0.85,
          "happiness_delta": 3
        }
      },
      {
        "id": "FF_2072_one_to_one_memory",
        "year_range": [
          2066,
          2092
        ],
        "probability": 0.34,
        "category": "demographics_care",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "age_ratio_1_to_1"
        ],
        "title": "『青老比 1：1』歷史時刻與全台數位家族記憶館計畫",
        "summary": "台灣總人口來到約 1,500 萬人、65 歲以上人口接近半數，達成『每 1 位青壯年對應 1 位長者』的結構平衡。國家發起全台口述歷史與數位家族記憶庫計畫，把戰後至今百餘年的庶民故事完整留給更精巧卻富裕的新世代。",
        "institutional_aftermath": "社會正式告別人口紅利成長迷思，轉以『人均福祉、生態與文化厚度』作為國家衡量核心。",
        "trend_basis": "虛構推演 · 延伸自國發會 2070 年人口中推估（1,497 萬人、65+ 占 46.5%、青老比 1:1）。",
        "cultural_footnote_en": "Fictional forecast: As Taiwan reaches a 1:1 working-age to senior ratio around 15 million residents, a national digital oral-history archive preserves a century of everyday lives.",
        "gameplay_impact": {
          "happiness_delta": 4,
          "social_delta": 4
        }
      },
      {
        "id": "FF_2078_netzero_green_island",
        "year_range": [
          2072,
          2110
        ],
        "probability": 0.35,
        "category": "climate_energy",
        "regions": [
          "ALL"
        ],
        "requires_world_flags": [
          "clean_baseload_ready"
        ],
        "sets_world_flags": [
          "green_island_stabilized"
        ],
        "title": "淨零轉型滿四分之一世紀：全台立體綠廊城市與潔淨空氣回歸",
        "summary": "受惠於早年果斷完成潔淨基載與全電交通轉型，台灣都會區全面拆除老舊高架道路改建為立體森林步廊，PM2.5 長年維持極低水準，夏季都市熱島效應較半世紀前明顯降溫，成為亞太低碳宜居標竿。",
        "institutional_aftermath": "呼吸道與心血管環境致病率創下歷史新低，人與海洋山林重新建立緊密連結。",
        "trend_basis": "虛構推演 · 依賴前置分支『潔淨基載電力商轉』，推演台灣完成長期淨零轉型後的環境紅利。",
        "cultural_footnote_en": "Fictional forecast: Decades after clean baseload power and full electrification, Taiwan's cities convert old viaducts into vertical greenways with historically clean air.",
        "gameplay_impact": {
          "health_delta": 6,
          "happiness_delta": 6,
          "mortality_mult": 0.92
        }
      }
    ]
  }
};
