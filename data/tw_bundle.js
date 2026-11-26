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
            {
              "text": "公車與腳踏車通勤",
              "max_year": 1995
            },
            {
              "text": "搭捷運轉公車上下班、上下課",
              "min_year": 1996
            },
            "擠公車上學、上班",
            {
              "text": "雙北跨橋機車潮",
              "min_age": 18
            }
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
            {
              "text": "補習街的招牌一路亮到晚上十點，街上都是背書包的學生",
              "min_age": 13,
              "max_age": 19,
              "min_year": 1970
            },
            {
              "text": "診所和大醫院都在公車幾站內，看病不必跑遠",
              "min_age": 8
            },
            {
              "text": "走在路上總覺得大家腳步特別快",
              "min_age": 8,
              "min_year": 1970
            },
            {
              "text": "每個月發薪水，先扣掉房租才算自己的錢",
              "min_age": 20,
              "requires_working": true,
              "requires_renter": true
            }
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
            {
              "text": "客運、火車與鄉鎮幹道通勤",
              "max_year": 1984
            },
            {
              "text": "園區上下班塞車",
              "min_year": 1990,
              "min_age": 18,
              "requires_working": true
            },
            {
              "text": "機捷／高鐵跨區通勤",
              "min_year": 2017
            },
            {
              "text": "騎機車或開車代步",
              "min_age": 18,
              "min_year": 1980
            }
          ],
          "housing": [
            "竹北／青埔重劃區",
            "明星學區總量管制擠破頭"
          ],
          "climate": [
            "新竹九降風強勁"
          ],
          "lifestyle": [
            {
              "text": "九降風一吹，曬衣架上的衣服半天就乾了",
              "min_age": 4
            },
            {
              "text": "鄰居多是年輕爸媽，社區遊樂場週末總是排隊",
              "min_age": 3,
              "min_year": 2005
            },
            {
              "text": "聚餐時身邊有人聊股票分紅，有人忙著處理產線異常",
              "min_year": 1996,
              "max_year": 2007,
              "min_age": 22,
              "requires_working": true
            },
            {
              "text": "假日車站前有各國移工聚會，小吃店飄著東南亞香料味",
              "min_year": 1995,
              "min_age": 6
            },
            {
              "text": "過年過節吃粄條、客家小炒，長輩說著客語",
              "min_age": 4
            }
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
            {
              "text": "騎機車或開車上班，停車位最難找",
              "min_age": 18,
              "min_year": 1985
            },
            {
              "text": "中捷綠線",
              "min_year": 2021
            }
          ],
          "housing": [
            "傳統透天厝與新興重劃區大樓並存"
          ],
          "climate": [
            "氣候晴朗宜人",
            "冬季中南部空品PM2.5微調風險"
          ],
          "lifestyle": [
            {
              "text": "巷子裡機器聲從早響到晚，好幾戶一樓都是小工廠",
              "min_age": 4,
              "min_year": 1970,
              "max_year": 2010
            },
            {
              "text": "認識的頭家說訂單少了一半，考慮收廠或西進",
              "min_year": 2000,
              "max_year": 2005,
              "min_age": 20
            },
            {
              "text": "經過山區還看得到地震後的空地與組合屋",
              "min_year": 2000,
              "max_year": 2006,
              "min_age": 5
            },
            {
              "text": "晴天多、雨天少，出門很少需要帶傘",
              "min_age": 6
            }
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
            {
              "text": "沒有機車幾乎出不了門",
              "min_age": 18,
              "min_year": 1978
            }
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
            {
              "text": "廟口酬神辦桌，全村大小都來看布袋戲",
              "min_age": 3
            },
            {
              "text": "村裡年輕人多半在外地，平日只剩阿公阿嬤在田邊聊天",
              "min_year": 2000,
              "min_age": 8
            },
            {
              "text": "早餐從一碗熱牛肉湯開始",
              "min_age": 8,
              "min_year": 1975
            },
            {
              "text": "鄰居阿伯說開放進口後，蒜頭、稻米價格愈來愈難看",
              "min_year": 2002,
              "max_year": 2008,
              "min_age": 14
            }
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
            {
              "text": "騎機車穿過大馬路，夏天等紅燈像烤箱",
              "min_age": 18,
              "min_year": 1978
            },
            {
              "text": "高雄捷運與輕軌",
              "min_year": 2008
            }
          ],
          "housing": [
            "舊市區公寓與北高雄科技廊帶新屋"
          ],
          "climate": [
            "夏季酷熱",
            "颱風登陸首當其衝（如2009莫拉克）"
          ],
          "lifestyle": [
            {
              "text": "上下班時間工廠交通車一輛接一輛，空氣裡有石化廠的味道",
              "min_year": 1975,
              "max_year": 2005,
              "min_age": 6
            },
            {
              "text": "同學畢業後一個個往北部找工作",
              "min_year": 2000,
              "max_year": 2018,
              "min_age": 18,
              "max_age": 35
            },
            {
              "text": "演唱會散場人潮擠滿捷運站，夜市生意跟著好起來",
              "min_year": 2022,
              "min_age": 12
            },
            {
              "text": "住屏東山邊的親戚看專科要坐一個多小時的車",
              "min_age": 8
            }
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
            {
              "text": "蘇花公路山海蜿蜒路途",
              "max_year": 2019
            },
            {
              "text": "蘇花公路／蘇花改",
              "min_year": 2020
            },
            {
              "text": "雪隧通車後，週末國道塞滿往宜蘭的車潮",
              "min_year": 2006
            },
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
            {
              "text": "豐年祭的歌聲從部落廣場傳來，親友從外地趕回來",
              "min_age": 4
            },
            {
              "text": "離島的朋友說冬天風浪大，船停開就只能等",
              "min_age": 8
            },
            {
              "text": "颱風前家家戶戶用木板釘窗、準備乾糧",
              "min_age": 4,
              "max_year": 2000
            },
            {
              "text": "要看大醫院的專科，得搭火車或轉診到外縣市",
              "min_age": 8
            }
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
        "stage": "嬰兒期（未滿1歲）",
        "qx_per_1000_male": 4.3,
        "qx_per_1000_female": 3.9,
        "note": "台灣嬰兒（未滿1歲）死亡率約4.1‰（其中出生28天內新生兒死亡率約2.8‰），近20年多為日韓2–3倍；1980年代前倍率可達2.5–6倍",
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
        "share_of_all_deaths": 0.275,
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
        1950,
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
      "coverage": "1950–2026（共 85 起重大歷史、制度、金融、災難與法制事件，全部為單一年度卡片）"
    },
    "events": [
      {
        "id": "EV_1950_us_aid_local_elections",
        "year": 1950,
        "year_end": 1950,
        "category": "economy_politics",
        "regions": [
          "ALL"
        ],
        "title": "韓戰爆發、美援重啟與首度縣市地方自治選舉",
        "summary": "1950 年 6 月韓戰爆發後美國重啟對台經濟與軍事援助，穩定戰後物價與電力交通建設；同年起台灣各縣市首度開辦縣市長與縣市議員直接民選，開啟地方自治實踐。",
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
        ],
        "impact_prob": {
          "central": 0.12,
          "south_tainan": 0.08
        },
        "disaster_name": "八七水災"
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
        ],
        "impact_prob": {
          "north_taipei": 0.15,
          "north_hsinchu": 0.06
        },
        "disaster_name": "葛樂禮颱風"
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
        "year_end": 1973,
        "category": "economy_finance",
        "regions": [
          "ALL"
        ],
        "title": "第一次石油危機爆發",
        "summary": "1973 年底中東戰爭引爆全球第一次石油危機，國際油價暴漲。高度仰賴能源進口的台灣物價開始飛漲，米、油、衛生紙等民生物資出現搶購潮。",
        "institutional_aftermath": "迫使台灣重新檢討能源依賴與產業結構，並加快重化工業與能源多元化的腳步。",
        "gameplay_impact": {
          "happiness_delta": -2
        },
        "sensitive": false,
        "cultural_footnote_en": "The 1973 oil shock hit import-dependent Taiwan with soaring prices and panic buying.",
        "sources": [
          "主計總處歷年消費者物價指數",
          "中央銀行經濟金融史"
        ]
      },
      {
        "id": "EV_1974_ten_major_projects",
        "year": 1974,
        "year_end": 1974,
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
        "id": "EV_1974_stagflation",
        "year": 1974,
        "year_end": 1974,
        "category": "economy_finance",
        "regions": [
          "ALL"
        ],
        "title": "47.5% 惡性通膨與「穩定當前經濟措施方案」",
        "summary": "1974 年 1 月政府宣布「穩定當前經濟措施方案」，一次大幅調升利率與油電價格；全年消費者物價年增率達 47.5%，台股重挫近六成，許多家庭的存款購買力瞬間縮水。",
        "institutional_aftermath": "重手段壓下通膨預期，物價在次年迅速回穩，也讓一整代人留下囤貨的記憶。",
        "gameplay_impact": {
          "happiness_delta": -4
        },
        "sensitive": false,
        "cultural_footnote_en": "Taiwan's 1974 CPI rose 47.5%; a one-shot hike in rates and utility prices restored stability within a year.",
        "sources": [
          "主計總處歷年消費者物價指數",
          "中央銀行經濟金融史"
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
        "summary": "1976 年教育部正式廢除「自費留學考試」，大幅降低大學生自費出國門檻；同時繼 1975 年楊弦民謠演唱會之後，大學校園「唱自己的歌」的民歌風氣持續升溫，學生背著吉他把新詩譜成歌。",
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
        "year_end": 1979,
        "category": "politics_society",
        "regions": [
          "south_kaohsiung",
          "ALL"
        ],
        "title": "美麗島事件",
        "summary": "1979 年 12 月 10 日世界人權日，黨外人士於高雄集會遊行引發警民衝突，當局隨後在全島展開大逮捕。",
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
          "base_prob": 0.015,
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
              "narrative": "你因關心民主集會出現在高雄人權日現場，事後遭情治單位約談並被原公司解僱，職涯被迫轉向民間自營。",
              "happiness_delta": -12,
              "knowledge_delta": 10,
              "job_lost": true,
              "money_ratio_delta": -0.2
            },
            {
              "weight": 0.3,
              "severity": "trajectory_heavy",
              "narrative": "你因參與現場聲援捲入戒嚴軍法偵辦，遭判刑入獄，整個人生軌跡徹底改寫。",
              "health_delta": -15,
              "happiness_delta": -20,
              "knowledge_delta": 12,
              "job_lost": true,
              "money_ratio_delta": -0.45
            }
          ],
          "pi_track": "incident"
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
          "health_permanent_delta": -15
        },
        "sensitive": false,
        "cultural_footnote_en": "Taiwan's first mass industrial food-poisoning disaster (PCB-contaminated rice bran oil), eventually leading to a dedicated victim healthcare law in 2015.",
        "sources": [
          "衛福部油症專區",
          "立法院法律沿革"
        ],
        "protagonist_involvement": {
          "base_prob": 0.015,
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
          ],
          "pi_track": "incident"
        }
      },
      {
        "id": "EV_1980_hsinchu_science_park",
        "year": 1980,
        "year_end": 1980,
        "category": "economy_industry",
        "regions": [
          "north_hsinchu",
          "ALL"
        ],
        "title": "新竹科學工業園區設立（台灣矽谷起點）",
        "summary": "1980年12月新竹科學園區正式揭牌，配合工研院技術移轉與海外工程師返台創業（如聯電等），開啟台灣半導體與資通訊黃金時代。",
        "institutional_aftermath": "重塑桃竹苗所得與人口結構，「竹科工程師」躍升為戰後跨世代高薪與中產階級上升象徵。",
        "gameplay_impact": {
          "tech_wage_bonus": 1.05,
          "narrative_tag": "hsinchu_science_park"
        },
        "sensitive": false,
        "cultural_footnote_en": "Established in December 1980, Hsinchu Science Park anchored Taiwan's semiconductor ecosystem and turned Hsinchu into Asia's silicon hub.",
        "sources": [
          "國科會竹科管理局史料"
        ]
      },
      {
        "id": "EV_1980_formosa_trial",
        "year": 1980,
        "year_end": 1980,
        "category": "politics_society",
        "regions": [
          "ALL"
        ],
        "title": "美麗島軍法大審與林宅血案",
        "summary": "1980 年 2 月 28 日被告林義雄家中發生滅門血案，震驚社會；3 月美麗島案進行公開軍法審判，八名主要被告分別被判處重刑，報紙罕見大篇幅刊登法庭答辯。",
        "institutional_aftermath": "公開審判讓社會聽見黨外主張，辯護律師團與家屬日後成為民主運動的重要力量。",
        "gameplay_impact": {
          "happiness_delta": -2
        },
        "sensitive": true,
        "cultural_footnote_en": "The 1980 public court-martial of the Formosa defendants, following the murders at Lin Yi-hsiung's home, shocked Taiwan.",
        "sources": [
          "國家人權博物館史料"
        ]
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
          "unlock_daily_flavor": "bank_remove_helmet"
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
        "year_end": 1984,
        "category": "crime_politics",
        "regions": [
          "ALL"
        ],
        "title": "江南案",
        "summary": "旅美作家劉宜良（筆名江南）在加州遭台灣情治人員指使黑幫暗殺，引發美台關係劇烈震盪。",
        "institutional_aftermath": "重創威權體制的國際形象，促成情治體系檢討；1987年解嚴與1992年《刑法》第100條修正都在這股壓力下推進。",
        "gameplay_impact": {},
        "sensitive": false,
        "cultural_footnote_en": "The 1984 assassination of Taiwanese-American writer Henry Liu in California severely strained US-Taiwan ties and accelerated the end of Martial Law.",
        "sources": [
          "國史館史料"
        ]
      },
      {
        "id": "EV_1984_labor_standards_act",
        "year": 1984,
        "year_end": 1984,
        "category": "law_economy",
        "regions": [
          "ALL"
        ],
        "title": "《勞動基準法》頒布施行（台灣首部綜合性勞工法）",
        "summary": "1984年8月《勞動基準法》正式施行，首度明訂最低工資、法定工時、加班費、資遣費與舊制退休金規範，結束戰後工廠缺乏統一勞動底線的年代。",
        "institutional_aftermath": "確立受僱勞工基本勞動基準與童工／青少年工讀保護（15歲門檻），奠定日後2005年勞退新制改革基礎。",
        "gameplay_impact": {
          "happiness_delta": 2,
          "narrative_tag": "labor_standards_act"
        },
        "sensitive": false,
        "cultural_footnote_en": "Taiwan's 1984 Labor Standards Act codified minimum wages, overtime pay, severance, and minimum working-age protections across industries.",
        "sources": [
          "勞動部法制史料"
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
          "base_prob": 0.03,
          "regions": [
            "north_taipei"
          ],
          "age_range": [
            22,
            70
          ],
          "trait_mult": {
            "risk_taker": 2,
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
          ],
          "pi_track": "systemic"
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
        "gameplay_impact": {},
        "sensitive": false,
        "cultural_footnote_en": "Taiwan's manufacturing share of GDP peaked in 1986—the same year the opposition Democratic Progressive Party (DPP) was founded despite Martial Law.",
        "sources": [
          "遠景基金會季刊",
          "遠見大事紀"
        ]
      },
      {
        "id": "EV_1986_taiex_1000",
        "year": 1986,
        "year_end": 1986,
        "category": "economy_finance",
        "regions": [
          "ALL"
        ],
        "title": "台股首度突破千點，游資湧入",
        "summary": "1986 年 10 月台股加權指數首度站上 1,000 點。新台幣升值預期吸引熱錢湧入，證券行號子開始擠滿看盤的上班族與家庭主婦。",
        "institutional_aftermath": "民間游資轉向股市與房市，開啟往後數年「台灣錢淹腳目」的投機熱潮。",
        "gameplay_impact": {
          "happiness_delta": 1
        },
        "sensitive": false,
        "cultural_footnote_en": "The TAIEX crossed 1,000 for the first time in October 1986 as appreciation expectations drew hot money into Taiwan.",
        "sources": [
          "臺灣證券交易所統計"
        ]
      },
      {
        "id": "EV_1987_martial_law_lifted",
        "year": 1987,
        "year_end": 1987,
        "category": "politics_economy",
        "regions": [
          "ALL"
        ],
        "title": "解嚴、台積電成立與開放探親",
        "summary": "1987年2月台積電成立、7月15日宣布解除長達38年戒嚴、11月開放民眾赴大陸探親，許多老兵第一次踏上返鄉路。",
        "institutional_aftermath": "政治全面解凍，台商西進序幕拉開，社會運動與言論空間快速打開。",
        "gameplay_impact": {
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
        "id": "EV_1988_press_freedom_520",
        "year": 1988,
        "year_end": 1988,
        "category": "politics_society",
        "regions": [
          "ALL"
        ],
        "title": "報禁解除、蔣經國辭世與 520 農民運動",
        "summary": "1988 年元旦報禁解除，報紙張數與家數暴增；1 月 13 日總統蔣經國辭世，李登輝繼任；5 月 20 日農民北上抗議開放農產品進口，爆發激烈街頭衝突。",
        "institutional_aftermath": "新聞自由與街頭社會運動進入常民生活，農民保險與農業補貼制度隨後逐步建立。",
        "gameplay_impact": {
          "happiness_delta": 1
        },
        "sensitive": false,
        "cultural_footnote_en": "In 1988 press restrictions were lifted, President Chiang Ching-kuo died, and farmers staged the landmark May 20 protest.",
        "sources": [
          "國史館史料"
        ]
      },
      {
        "id": "EV_1989_taiex_10000_snail",
        "year": 1989,
        "year_end": 1989,
        "category": "economy_finance",
        "regions": [
          "ALL"
        ],
        "title": "台股衝破萬點與無殼蝸牛夜宿忠孝東路",
        "summary": "1989 年 6 月台股首度突破萬點，「台灣錢淹腳目」；台北市房價幾年內翻漲數倍，8 月數萬名買不起房的民眾以「無殼蝸牛」之名夜宿忠孝東路抗議。",
        "institutional_aftermath": "催生日後的住宅政策團體，也讓「高房價」成為台灣社會長期議題。",
        "gameplay_impact": {
          "happiness_delta": -1
        },
        "sensitive": false,
        "cultural_footnote_en": "In 1989 the TAIEX topped 10,000 while 'shell-less snails' slept on Taipei's priciest street to protest soaring housing prices.",
        "sources": [
          "臺灣證券交易所統計",
          "住宅運動史料"
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
        "gameplay_impact": {},
        "sensitive": false,
        "cultural_footnote_en": "Taiwan's stock market plunged 80% in eight months in 1990—taking 30 years to recover its peak—just as the NT$94B Hongyuan Ponzi scheme collapsed.",
        "sources": [
          "EBC台股股災回顧",
          "股感",
          "理財周刊"
        ],
        "protagonist_involvement": {
          "base_prob": 0.045,
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
          ],
          "pi_track": "systemic"
        }
      },
      {
        "id": "EV_1990_wild_lily",
        "year": 1990,
        "year_end": 1990,
        "category": "politics_society",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "野百合學運",
        "summary": "1990 年 3 月數千名大學生在中正紀念堂廣場靜坐，訴求解散國民大會、廢除臨時條款、召開國是會議與訂定民主改革時間表，總統李登輝接見學生代表。",
        "institutional_aftermath": "推動國是會議召開與動員戡亂時期終止，也培養出一整代公民運動參與者。",
        "gameplay_impact": {
          "happiness_delta": 1
        },
        "sensitive": false,
        "cultural_footnote_en": "The March 1990 Wild Lily student movement pressed for democratic reform and led to the National Affairs Conference.",
        "sources": [
          "國家人權博物館史料"
        ]
      },
      {
        "id": "EV_1991_su_jianhe",
        "year": 1991,
        "year_end": 1991,
        "category": "crime_justice",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "汐止命案與蘇建和等三人被捕",
        "summary": "1991 年汐止發生夫妻命案，蘇建和、劉秉郎、莊林勳三名青年被捕，家屬與律師指控自白出於刑求，案件在法院間展開攻防。",
        "institutional_aftermath": "催生民間司法改革團體，促成2003年《刑事訴訟法》強化無罪推定與不正自白排除，並催生2010年《刑事妥速審判法》。",
        "gameplay_impact": {
          "narrative_tag": "judicial_reform"
        },
        "sensitive": true,
        "cultural_footnote_en": "Three young men were arrested in a 1991 murder case built on contested confessions, a focal point for Taiwan's judicial reform.",
        "sources": [
          "司法院判決紀錄",
          "民間司改會史料"
        ]
      },
      {
        "id": "EV_1991_end_mobilization",
        "year": 1991,
        "year_end": 1991,
        "category": "politics_society",
        "regions": [
          "ALL"
        ],
        "title": "終止動員戡亂與國會全面改選",
        "summary": "1991 年 5 月 1 日終止動員戡亂時期，年底資深民代全數退職，並舉行第二屆國民大會代表全面改選，「萬年國會」走入歷史。",
        "institutional_aftermath": "台灣國會由全體選民定期選出，為後續立委與總統直選鋪路。",
        "gameplay_impact": {
          "happiness_delta": 1
        },
        "sensitive": false,
        "cultural_footnote_en": "In 1991 Taiwan ended the Period of Mobilization and fully re-elected the National Assembly.",
        "sources": [
          "中央選舉委員會",
          "國史館史料"
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
          "unlock_daily_flavor": "school_bus_safety_drill"
        },
        "sensitive": true,
        "cultural_footnote_en": "A tragic 1992 kindergarten bus fire that killed 23, sparking strict tour-bus emergency exit laws and Taiwan's leading child-safety foundation.",
        "sources": [
          "靖娟兒童安全文教基金會史料"
        ],
        "protagonist_involvement": {
          "base_prob": 0.012,
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
          ],
          "pi_track": "incident"
        }
      },
      {
        "id": "EV_1992_article100",
        "year": 1992,
        "year_end": 1992,
        "category": "politics_society",
        "regions": [
          "ALL"
        ],
        "title": "《刑法》第 100 條修正與立委全面改選",
        "summary": "1992 年 5 月修正《刑法》第 100 條，廢除以言論或思想入罪的內亂罪規定，海外黑名單逐步解除；年底舉行立法委員全面改選。",
        "institutional_aftermath": "言論自由獲得實質保障，街頭與媒體的公共討論更為活躍。",
        "gameplay_impact": {
          "happiness_delta": 1
        },
        "sensitive": false,
        "cultural_footnote_en": "The 1992 revision of Criminal Code Article 100 ended prosecution for non-violent sedition.",
        "sources": [
          "全國法規資料庫"
        ]
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
        "gameplay_impact": {},
        "sensitive": false,
        "cultural_footnote_en": "The 1994 education reform movement demanded wider university access, pushing admission rates from 44% to nearly 100% within two decades.",
        "sources": [
          "關鍵評論網",
          "聯合報專題",
          "教育部"
        ]
      },
      {
        "id": "EV_1995_nhi_launch",
        "year": 1995,
        "year_end": 1995,
        "category": "welfare_health",
        "regions": [
          "ALL"
        ],
        "title": "全民健康保險開辦（告別因病而貧）",
        "summary": "1995年3月全民健保正式開辦，將公保、勞保、農保與過去毫無保險的婦幼長者全數納入單一保險網，納保率迅速突破99%。",
        "institutional_aftermath": "大幅壓低家庭重大傷病自付醫療負擔，使台灣基層醫療可近性躍居全球前段，並顯著拉升中高齡存活率。",
        "gameplay_impact": {
          "happiness_delta": 5,
          "health_delta": 3,
          "narrative_tag": "nhi_launch"
        },
        "sensitive": false,
        "cultural_footnote_en": "Launched in March 1995, Taiwan's single-payer National Health Insurance achieved >99% coverage and dramatically cut medical bankruptcy.",
        "sources": [
          "衛福部健保署史料"
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
        "gameplay_impact": {},
        "sensitive": true,
        "cultural_footnote_en": "Taiwan's deadliest single-building fire (64 deaths in Taichung) led to sweeping fire-code overhauls and mandatory flame-retardant standards.",
        "sources": [
          "內政部消防署法制沿革"
        ],
        "protagonist_involvement": {
          "base_prob": 0.01,
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
          ],
          "pi_track": "incident"
        }
      },
      {
        "id": "EV_1996_liu_peng_cases",
        "year": 1996,
        "year_end": 1996,
        "category": "crime_society",
        "regions": [
          "north_hsinchu",
          "south_kaohsiung",
          "north_taipei",
          "ALL"
        ],
        "title": "劉邦友官邸血案與彭婉如命案",
        "summary": "1996 年 11 月桃園縣長官邸發生血案，月底婦運領袖彭婉如搭計程車後遇害，治安與婦女夜間安全成為全國焦慮。",
        "institutional_aftermath": "彭婉如案催生《性侵害犯罪防治法》（1997）與計程車管理改革。",
        "gameplay_impact": {
          "happiness_delta": -2
        },
        "sensitive": true,
        "cultural_footnote_en": "Two shocking murder cases in late 1996 led to Taiwan's Sexual Assault Crime Prevention Act and taxi reform.",
        "sources": [
          "立法院法制沿革",
          "台灣新聞倫理史料"
        ]
      },
      {
        "id": "EV_1996_first_presidential_election",
        "year": 1996,
        "year_end": 1996,
        "category": "politics_democracy",
        "regions": [
          "ALL"
        ],
        "title": "首次總統直選與台海飛彈危機",
        "summary": "1996年3月23日台灣舉行中華民國史上第一次公民直選總統，投票率達76.04%，在中共對台海試射飛彈與美軍雙航母戒備的緊張氛圍中完成和平投票。",
        "institutional_aftermath": "奠定台灣民主政權的直接民意正當性，同時使地緣政治與資金避險意識深植台灣經濟與移民抉擇。",
        "gameplay_impact": {
          "happiness_delta": 2,
          "narrative_tag": "first_direct_presidential_election"
        },
        "sensitive": false,
        "cultural_footnote_en": "Taiwan's landmark March 1996 direct presidential election saw 76% turnout despite cross-strait missile tests.",
        "sources": [
          "中選會選舉資料庫"
        ]
      },
      {
        "id": "EV_1997_asian_crisis",
        "year": 1997,
        "year_end": 1997,
        "category": "finance",
        "regions": [
          "ALL"
        ],
        "title": "亞洲金融風暴波及台灣",
        "summary": "1997 年下半年亞洲金融風暴蔓延，新台幣貶值，台股自 8 月萬點高點一度回落約三成，全年仍小幅收漲，受創程度輕於鄰國。",
        "institutional_aftermath": "讓社會注意到企業高槓桿與交叉持股的風險。",
        "gameplay_impact": {
          "happiness_delta": -1
        },
        "sensitive": false,
        "cultural_footnote_en": "The 1997 Asian Financial Crisis sent the TAIEX down about 30% from its August peak, though Taiwan fared better than its neighbors.",
        "sources": [
          "科技新報",
          "金管會史料"
        ]
      },
      {
        "id": "EV_1997_pai_hsiao_yen",
        "year": 1997,
        "year_end": 1997,
        "category": "crime_society",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "白曉燕案與「五〇四為台灣而走」",
        "summary": "1997 年 4 月藝人之女白曉燕遭綁架撕票，歹徒在逃期間持續犯案；5 月 4 日數萬民眾走上街頭，要求政府為治安負責。",
        "institutional_aftermath": "內閣因此改組，並引發對媒體採訪綁架案與現場連線報導倫理的深刻反省。",
        "gameplay_impact": {
          "happiness_delta": -3
        },
        "sensitive": true,
        "cultural_footnote_en": "The 1997 kidnapping and murder of Pai Hsiao-yen sparked mass protests over public safety and media ethics.",
        "sources": [
          "國史館史料",
          "台灣新聞倫理史料"
        ]
      },
      {
        "id": "EV_1998_local_crisis",
        "year": 1998,
        "year_end": 1998,
        "category": "finance",
        "regions": [
          "ALL"
        ],
        "title": "本土型金融風暴與企業跳票潮",
        "summary": "1998 年下半年，多家財團因交叉持股、股票質押超貸而接連跳票違約，銀行逾放比飆升，中小企業資金緊縮。",
        "institutional_aftermath": "促使政府推動金融改革、打消呆帳與銀行整併，並於2004年成立金融監督管理委員會（金管會）。",
        "gameplay_impact": {
          "happiness_delta": -2,
          "sme_layoff_risk_mult": 1.6
        },
        "sensitive": false,
        "cultural_footnote_en": "A wave of corporate defaults in late 1998 exposed over-leveraging and pushed Taiwan toward financial reform.",
        "sources": [
          "金管會史料",
          "中央銀行年報"
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
        "gameplay_impact": {},
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
          "base_prob": 0.045,
          "regions": [
            "central",
            "north_taipei"
          ],
          "age_range": [
            18,
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
              "weight": 0.012,
              "severity": "fatal",
              "narrative": "921 規模 7.3 強震深夜襲擊，你所在的建物於劇烈搖晃中倒塌，不幸於震災中罹難。",
              "fatal": true,
              "death_cause": "1999 年 921 集集大地震（建物倒塌）"
            }
          ],
          "pi_track": "systemic"
        },
        "impact_prob": {
          "central": 0.1,
          "north_taipei": 0.008
        },
        "disaster_name": "921 大地震"
      },
      {
        "id": "EV_2000_dotcom_bubble",
        "year": 2000,
        "year_end": 2000,
        "category": "finance",
        "regions": [
          "ALL"
        ],
        "title": "全球網路泡沫破滅",
        "summary": "2000 年全球網路泡沫破滅，台股自 2 月萬點高檔一路下滑，全年重挫 43.9%，科技新貴的股票財富大幅縮水。",
        "institutional_aftermath": "科技業歷經洗牌，台商加速西進中國設廠。",
        "gameplay_impact": {
          "happiness_delta": -2,
          "tech_layoff_risk_mult": 1.5
        },
        "sensitive": false,
        "cultural_footnote_en": "The 2000 dot-com crash sent the TAIEX down 43.9% for the year.",
        "sources": [
          "科技新報",
          "工商時報"
        ]
      },
      {
        "id": "EV_2000_first_party_turnover",
        "year": 2000,
        "year_end": 2000,
        "category": "politics_democracy",
        "regions": [
          "ALL"
        ],
        "title": "2000 年首次政黨輪替（和平政權轉移）",
        "summary": "2000年總統大選完成台灣戰後首次中央執政權和平輪替，終結國民黨長達半世紀的執政，展現台灣民主制度的穩定成熟。",
        "institutional_aftermath": "強化定期選舉與政黨監督常態化，激勵不少海外台灣青年返台投入公共政策與媒體轉型。",
        "gameplay_impact": {
          "happiness_delta": 2,
          "narrative_tag": "first_party_turnover"
        },
        "sensitive": false,
        "cultural_footnote_en": "The 2000 presidential election marked Taiwan's first peaceful transfer of executive power between rival political parties.",
        "sources": [
          "中選會公開史料"
        ]
      },
      {
        "id": "EV_2001_recession_offshoring",
        "year": 2001,
        "year_end": 2001,
        "category": "finance",
        "regions": [
          "ALL"
        ],
        "title": "失業率攀升與製造業外移低谷",
        "summary": "2001 年受全球景氣與 911 事件衝擊，台股一度跌至 3,411 點，失業率升破 4.5%，製造業占 GDP 降至 28.89%，工廠外移、關廠新聞頻傳。",
        "institutional_aftermath": "「台幹」與「中年失業」成為此時期最貼身的職場記憶，政府擴大就業方案與職業訓練。",
        "gameplay_impact": {
          "happiness_delta": -2,
          "sme_layoff_risk_mult": 1.4,
          "tech_layoff_risk_mult": 1.4
        },
        "sensitive": false,
        "cultural_footnote_en": "In 2001 unemployment passed 4.5% and manufacturing's share of GDP fell to 28.89% as factories moved offshore.",
        "sources": [
          "主計總處統計",
          "臺灣證券交易所統計"
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
        "summary": "SARS期間經WHO與疾管署最終血清抗體覆核，全台確診346例、73人死亡、逾15萬人居家隔離；4月24日台北和平醫院封院釀醫護與院內民眾重大傷亡。同年台灣首檔指數ETF「0050」成立。",
        "institutional_aftermath": "SARS重創促成台灣建立中央流行疫情指揮中心與負壓隔離醫療體系，成為2020年COVID-19初期防堵成功的關鍵經驗。",
        "gameplay_impact": {},
        "sensitive": true,
        "cultural_footnote_en": "The traumatic 2003 SARS lockdown of Taipei's Heping Hospital forged the public-health command system that later guided Taiwan's COVID-19 response.",
        "sources": [
          "IJID",
          "公視新聞",
          "經濟日報"
        ],
        "protagonist_involvement": {
          "base_prob": 0.012,
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
          ],
          "pi_track": "incident"
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
          "base_prob": 0.025,
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
              "weight": 1,
              "severity": "economic_major",
              "narrative": "你深信財報亮眼的明星科技股博達而重壓大半股票資產，無預警重整後股價連吞跌停淪為壁紙，多年積蓄重創。",
              "stock_ratio_delta": -0.75,
              "money_ratio_delta": -0.2,
              "happiness_delta": -20
            }
          ],
          "pi_track": "systemic"
        }
      },
      {
        "id": "EV_2005_card_debt",
        "year": 2005,
        "year_end": 2005,
        "category": "finance_society",
        "regions": [
          "ALL"
        ],
        "title": "雙卡債務浮現（卡奴現象）",
        "summary": "銀行浮濫發行信用卡與現金卡、循環利率近 20%。2005 年起越來越多持卡人只繳最低應繳金額、以卡養卡，「卡奴」成為社會新名詞。",
        "institutional_aftermath": "金管會開始限縮發卡與廣告，並在2006年推動債務協商機制。",
        "gameplay_impact": {},
        "sensitive": false,
        "cultural_footnote_en": "By 2005, easy cash cards and ~20% revolving rates had created a new class of 'card slaves' in Taiwan.",
        "sources": [
          "公視新聞",
          "台大論文"
        ],
        "protagonist_involvement": {
          "base_prob": 0.04,
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
              "weight": 1,
              "severity": "economic_severe",
              "narrative": "你為周轉生活費辦了多張現金卡與信用卡以卡養卡，近 20% 循環利息滾成百萬卡債，陷入「卡奴」困境。",
              "money_ratio_delta": -0.8,
              "extra_debt_2025": 1100000,
              "happiness_delta": -28,
              "heavy_debt": true
            }
          ],
          "pi_track": "systemic"
        }
      },
      {
        "id": "EV_2006_card_negotiation",
        "year": 2006,
        "year_end": 2006,
        "category": "finance_society",
        "regions": [
          "ALL"
        ],
        "title": "卡債風暴與債務協商機制",
        "summary": "2006 年逼近 80 萬人陷入卡債，其中約 52 萬人連 6 個月最低應繳都付不出；至年底協商 22 萬餘件、平均每件 144 萬元，催債與家庭悲劇成為社會新聞。",
        "institutional_aftermath": "促成立法院於2007年三讀、2008年4月施行《消費者債務清理條例》，建立平民「更生／清算」機制。",
        "gameplay_impact": {
          "happiness_delta": -1
        },
        "sensitive": false,
        "cultural_footnote_en": "In 2006 nearly 800,000 cardholders were in distress, leading to Taiwan's 2008 consumer debt-clearance law.",
        "sources": [
          "公視新聞",
          "台大論文"
        ]
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
        "gameplay_impact": {},
        "sensitive": false,
        "cultural_footnote_en": "The collapse of the Rebar conglomerate sparked a bank run at Chinese Bank and tightened oversight of conglomerate cross-holdings in Taiwan.",
        "sources": [
          "司法院判決與金管會史料"
        ]
      },
      {
        "id": "EV_2007_thsr_launch",
        "year": 2007,
        "year_end": 2007,
        "category": "infra_economy",
        "regions": [
          "ALL"
        ],
        "title": "台灣高鐵全線通車（西部一日生活圈成形）",
        "summary": "2007年台灣高鐵通車（台北至左營僅約90–120分鐘），繼1996台北捷運與2006雪山隧道後，徹底改寫台灣西部走廊通勤與商務版圖。",
        "institutional_aftermath": "帶動桃園青埔、竹北、台中烏日與台南沙崙高鐵特區房地產起飛，也讓雙北以外都會區擴大跨縣市通勤人口。",
        "gameplay_impact": {
          "happiness_delta": 3,
          "narrative_tag": "thsr_one_day_living_circle"
        },
        "sensitive": false,
        "cultural_footnote_en": "Opening in 2007, Taiwan High Speed Rail shrank the Taipei–Kaohsiung trip to ~90 minutes, reshaping commuting and regional property markets.",
        "sources": [
          "交通部高鐵營運資料"
        ]
      },
      {
        "id": "EV_2008_gfc_lehman",
        "year": 2008,
        "year_end": 2008,
        "category": "finance_economy",
        "regions": [
          "ALL"
        ],
        "title": "全球金融海嘯與雷曼連動債風暴",
        "summary": "2008年9月雷曼兄弟倒閉引爆全球金融海嘯，台灣約10萬名投資人持有連動債嚴重受損，台股全年大跌46%（自高點回落逾五成七），出口與科技業湧現無薪假。",
        "institutional_aftermath": "催生《金融消費者保護法》與銀行理專不當銷售規範；2009年政府推出22K實習方案因應青年失業潮。",
        "gameplay_impact": {
          "happiness_delta": -2,
          "tech_layoff_risk_mult": 1.6,
          "sme_layoff_risk_mult": 1.5
        },
        "sensitive": false,
        "cultural_footnote_en": "The 2008 Lehman collapse hit ~100,000 Taiwanese structured-note investors; the TAIEX fell 46% for the year amid widespread unpaid leave.",
        "sources": [
          "今周刊",
          "中央銀行年報"
        ],
        "protagonist_involvement": {
          "pi_track": "systemic",
          "base_prob": 0.05,
          "regions": [
            "ALL"
          ],
          "age_range": [
            20,
            75
          ],
          "trait_mult": {
            "risk_taker": 1.7
          },
          "exp_tags": [
            "has_savings"
          ],
          "outcomes": [
            {
              "weight": 1,
              "severity": "economic_major",
              "narrative": "銀行理專推銷的連動債價值大幅縮水加上金融海嘯裁員減薪，你的積蓄受到重創，被迫縮衣節食度過景氣寒冬。",
              "money_ratio_delta": -0.45,
              "stock_ratio_delta": -0.4,
              "job_lost": true,
              "happiness_delta": -20
            }
          ]
        }
      },
      {
        "id": "EV_2009_morakot_88_flood",
        "year": 2009,
        "year_end": 2009,
        "category": "disaster_economy",
        "regions": [
          "south_kaohsiung",
          "south_tainan",
          "east_islands"
        ],
        "title": "莫拉克八八風災與 22K 方案（失業率 5.85%）",
        "summary": "2009年8月莫拉克颱風三天降下整年雨量重創南台灣與花東，釀681死、小林村滅村；同年全台年均失業率攀至5.85%（8月達6.13%），政府推出大專畢業生22K實習方案。",
        "institutional_aftermath": "22K成為世代低薪代名詞；八八風災全面推動原鄉防災撤離與土石流警戒系統升級。",
        "gameplay_impact": {
          "happiness_delta_region": -6
        },
        "sensitive": true,
        "cultural_footnote_en": "In 2009, Typhoon Morakot devastated southern and eastern Taiwan—burying Xiaolin Village with 681 dead—while youth unemployment spurred the NT$22K internship scheme.",
        "sources": [
          "聯合報",
          "監察院",
          "遠見"
        ],
        "impact_regions": [
          "south_kaohsiung",
          "south_tainan",
          "east_islands"
        ],
        "disaster_year": 2009,
        "protagonist_involvement": {
          "pi_track": "systemic",
          "base_prob": 0.04,
          "regions": [
            "south_kaohsiung",
            "south_tainan",
            "east_islands"
          ],
          "age_range": [
            18,
            80
          ],
          "trait_mult": {
            "family_first": 1.25
          },
          "exp_tags": [
            "homeowner"
          ],
          "outcomes": [
            {
              "weight": 0.92,
              "severity": "disaster_relocate",
              "narrative": "莫拉克八八風災三天降下整年雨量，南台灣／東部家園遭洪水與土石流沖毀，你成為災民被迫異地安置重建。",
              "lose_home": true,
              "money_ratio_delta": -0.4,
              "happiness_delta": -24,
              "force_relocate": true
            },
            {
              "weight": 0.03,
              "severity": "fatal",
              "narrative": "莫拉克颱風引發大規模山崩與土石流深夜沖毀家園，你在八八風災中不幸罹難。",
              "fatal": true,
              "death_cause": "2009 年莫拉克八八風災"
            }
          ]
        },
        "impact_prob": {
          "south_kaohsiung": 0.03,
          "south_tainan": 0.02,
          "east_islands": 0.02
        },
        "disaster_name": "莫拉克風災"
      },
      {
        "id": "EV_2009_labor_pension_annuity",
        "year": 2009,
        "year_end": 2009,
        "category": "labor_policy",
        "regions": [
          "ALL"
        ],
        "title": "勞保老年給付年金化",
        "summary": "2009 年元旦起勞工保險老年給付改採年金制，勞工退休後可按月領取直到終老，不再只能一次領完；請領年齡也依出生年逐步提高至 65 歲。",
        "institutional_aftermath": "讓勞工有了終身月領的基本保障，但基金長期財務壓力也成為後續改革焦點。",
        "gameplay_impact": {
          "happiness_delta": 1
        },
        "sensitive": false,
        "cultural_footnote_en": "From January 2009 Taiwan's Labor Insurance old-age benefit could be drawn as a lifetime annuity.",
        "sources": [
          "勞動部勞工保險局"
        ]
      },
      {
        "id": "EV_2011_plasticizer",
        "year": 2011,
        "year_end": 2011,
        "category": "society_food_safety",
        "regions": [
          "ALL"
        ],
        "title": "塑化劑風暴",
        "summary": "2011 年 5 月爆發飲料與食品起雲劑違法添加塑化劑事件，手搖飲、果汁與保健品大規模下架，家長人心惶惶。",
        "institutional_aftermath": "推動食品添加物管理與源頭追溯，立法院其後多次大修食品衛生管理法規。",
        "gameplay_impact": {
          "health_delta": -1,
          "happiness_delta": -1
        },
        "sensitive": false,
        "cultural_footnote_en": "The 2011 plasticizer scandal forced mass recalls of drinks and foods across Taiwan.",
        "sources": [
          "衛福部食藥署法制沿革"
        ]
      },
      {
        "id": "EV_2012_su_acquittal",
        "year": 2012,
        "year_end": 2012,
        "category": "crime_justice",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "蘇建和案無罪定讞",
        "summary": "歷經 21 年訴訟，2012 年 8 月法院對蘇建和、劉秉郎、莊林勳三人判決無罪定讞，成為台灣司法史上的指標案件。",
        "institutional_aftermath": "強化社會對刑求自白、科學鑑識與妥速審判的重視。",
        "gameplay_impact": {},
        "sensitive": true,
        "cultural_footnote_en": "After 21 years, the three defendants in the Hsichih case were acquitted with finality in August 2012.",
        "sources": [
          "司法院判決紀錄",
          "民間司改會史料"
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
        "gameplay_impact": {},
        "sensitive": true,
        "cultural_footnote_en": "The 2013 death of conscript Hung Chung-chiu sparked a 250,000-person protest that abolished peacetime military courts in Taiwan.",
        "sources": [
          "立法院軍事審判法修法紀錄"
        ],
        "protagonist_involvement": {
          "base_prob": 0.014,
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
              "weight": 1,
              "severity": "trajectory",
              "narrative": "你服役期間親身見證軍中不當管教文化，退伍後毅然站上凱道加入 25 萬人白衫軍運動，促成《軍事審判法》修法成為人生重要轉折。",
              "happiness_delta": -4,
              "knowledge_delta": 8,
              "social_delta": 10
            }
          ],
          "pi_track": "incident"
        }
      },
      {
        "id": "EV_2013_toxic_starch",
        "year": 2013,
        "year_end": 2013,
        "category": "society_food_safety",
        "regions": [
          "ALL"
        ],
        "title": "毒澱粉與食用油混充事件",
        "summary": "2013 年珍珠、粉圓等食品驗出違法順丁烯二酸澱粉，年底又爆出食用油混充，民眾對在地小吃與大廠品牌的信任同時動搖。",
        "institutional_aftermath": "《食品衛生管理法》加重罰則並強化食品業者自主檢驗。",
        "gameplay_impact": {
          "happiness_delta": -1
        },
        "sensitive": false,
        "cultural_footnote_en": "In 2013 illegally modified starch and adulterated cooking oil shook trust in Taiwan's foods.",
        "sources": [
          "衛福部食藥署法制沿革"
        ]
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
          "base_prob": 0.015,
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
          ],
          "pi_track": "incident"
        }
      },
      {
        "id": "EV_2014_sunflower_movement",
        "year": 2014,
        "year_end": 2014,
        "category": "politics_society",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "太陽花學運（318 公民佔領國會與世代轉折）",
        "summary": "2014年3月青年學生與公民團體因反對《海峽兩岸服務貿易協議》審查程序，佔領立法院議場24天並引發50萬人凱道集會。",
        "institutional_aftermath": "重塑台灣青年世代的政治參與、兩岸經貿審視基準與公民科技文化，使海內外青年重新定位台灣認同。",
        "gameplay_impact": {
          "happiness_delta": 1,
          "narrative_tag": "sunflower_movement"
        },
        "sensitive": false,
        "cultural_footnote_en": "The March 2014 Sunflower Movement saw students and civic groups occupy Taiwan's legislature for 24 days over trade-pact oversight, reshaping a generation's civic engagement.",
        "sources": [
          "立法院與中研院相關口述史料"
        ]
      },
      {
        "id": "EV_2014_taipei_metro_attack",
        "year": 2014,
        "year_end": 2014,
        "category": "crime_society",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "台北捷運隨機攻擊事件",
        "summary": "2014年5月北捷板南線龍山寺至江子翠站間發生無差別持刀攻擊，釀4死20餘傷，衝擊雙北通勤族安全感。",
        "institutional_aftermath": "強化大眾運輸見警率與車站通報應變機制，社會開始嚴肅討論心理衛生與孤立者預警議題。",
        "gameplay_impact": {
          "happiness_delta_north_taipei": -3
        },
        "sensitive": true,
        "cultural_footnote_en": "A 2014 stabbing attack on the Taipei Metro Blue Line shocked commuters and prompted major transit security upgrades.",
        "sources": [
          "交通部及北市府公開紀錄"
        ],
        "protagonist_involvement": {
          "pi_track": "incident",
          "base_prob": 0.012,
          "regions": [
            "north_taipei"
          ],
          "age_range": [
            15,
            65
          ],
          "trait_mult": {
            "workaholic": 1.25,
            "sociable": 1.25,
            "sensitive_introvert": 1.3
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
        "id": "EV_2014_gutter_oil",
        "year": 2014,
        "year_end": 2014,
        "category": "society_food_safety",
        "regions": [
          "ALL"
        ],
        "title": "劣質油風暴",
        "summary": "2014 年 9 月爆發餿水油與飼料油混充食用油事件，波及糕餅、夜市與連鎖餐飲，消費者發起抵制大廠。",
        "institutional_aftermath": "2014年底行政院成立食品安全辦公室，並加速推動食品雲與追溯追蹤系統。",
        "gameplay_impact": {
          "health_delta": -1,
          "happiness_delta": -2
        },
        "sensitive": false,
        "cultural_footnote_en": "The 2014 gutter-oil scandal triggered boycotts and led to the Cabinet's Office of Food Safety.",
        "sources": [
          "衛福部食藥署法制沿革"
        ]
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
        "gameplay_impact": {},
        "sensitive": true,
        "cultural_footnote_en": "The 2015 Formosa Fun Coast color-powder explosion injured 484 young people, leading to a nationwide ban on flammable powder at public events.",
        "sources": [
          "三立新聞",
          "鏡週刊"
        ],
        "protagonist_involvement": {
          "base_prob": 0.012,
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
          ],
          "pi_track": "incident"
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
        "id": "EV_2016_neihu_safety_net",
        "year": 2016,
        "year_end": 2016,
        "category": "crime_society",
        "regions": [
          "north_taipei",
          "ALL"
        ],
        "title": "內湖女童案與《強化社會安全網計畫》",
        "summary": "2016年3月台北內湖發生4歲女童（小燈泡）遇害案，引發全台對精神衛生體系與高風險家庭斷裂的深刻檢討。",
        "institutional_aftermath": "促使行政院啟動跨部會「強化社會安全網」計畫，結合衛政、社政與警政追蹤高風險個案，並推動被害人司法參與。",
        "gameplay_impact": {
          "happiness_delta_north_taipei": -2
        },
        "sensitive": true,
        "cultural_footnote_en": "The tragic 2016 Neihu attack catalyzed Taiwan's cross-ministry 'Strengthening the Social Safety Net' mental-health and social-work initiative.",
        "sources": [
          "衛福部強化社會安全網計畫"
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
          "happiness_delta": 2
        },
        "sensitive": false,
        "cultural_footnote_en": "On May 24, 2019, Taiwan became the first country in Asia to legalize same-sex marriage.",
        "sources": [
          "報導者"
        ]
      },
      {
        "id": "EV_2020_covid_border",
        "year": 2020,
        "year_end": 2020,
        "category": "epidemic_economy",
        "regions": [
          "ALL"
        ],
        "title": "COVID-19 爆發：口罩實名制與邊境管制",
        "summary": "2020 年 COVID-19 席捲全球，台灣以邊境管制、口罩實名制與疫調守住社區；台股 3 月一度重挫約三成後 V 轉，一年期定存利率跌破 1%。",
        "institutional_aftermath": "建立社區防疫習慣，也突顯台灣半導體在全球供應鏈的關鍵地位。",
        "gameplay_impact": {
          "happiness_delta": -2
        },
        "sensitive": true,
        "cultural_footnote_en": "In 2020 Taiwan kept COVID-19 largely at bay with border controls and mask rationing.",
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
        "year_end": 2021,
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
          "base_prob": 0.015,
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
              "weight": 0.1,
              "severity": "fatal",
              "narrative": "清明連假返鄉途中搭乘太魯閣號 408 車次，於花蓮清水隧道口撞擊工程車出軌事故中不幸罹難。",
              "fatal": true,
              "death_cause": "2021 年台鐵太魯閣號 408 車次出軌事故"
            }
          ],
          "pi_track": "incident"
        }
      },
      {
        "id": "EV_2021_covid_level3",
        "year": 2021,
        "year_end": 2021,
        "category": "epidemic_economy",
        "regions": [
          "ALL"
        ],
        "title": "全國三級警戒與無薪假",
        "summary": "2021 年 5 月社區疫情升溫，全國進入三級警戒，學校停課、餐廳禁止內用，減班休息人數一度達 31,980 人，以餐飲住宿最多。",
        "institutional_aftermath": "加速遠距辦公、外送與線上課程普及，政府發放多輪紓困。",
        "gameplay_impact": {
          "happiness_delta": -3
        },
        "sensitive": true,
        "cultural_footnote_en": "Nationwide Level 3 restrictions in May 2021 closed schools and dine-in, peaking at 31,980 workers on reduced hours.",
        "sources": [
          "中央流行疫情指揮中心",
          "勞動部"
        ]
      },
      {
        "id": "EV_2022_fake_job_scam",
        "year": 2022,
        "year_end": 2022,
        "category": "crime_finance",
        "regions": [
          "ALL"
        ],
        "title": "假求職真詐騙：海外園區與台版柬埔寨",
        "summary": "2022 年跨國假求職詐騙氾濫，有青年被騙往東南亞園區，國內也爆發拘禁人頭帳戶提供者的「台版柬埔寨」案，家長人人自危。",
        "institutional_aftermath": "各級學校與機場加強宣導攔阻，檢警擴大查緝人頭帳戶。",
        "gameplay_impact": {
          "happiness_delta": -1
        },
        "sensitive": true,
        "cultural_footnote_en": "In 2022 fake overseas job scams and a domestic confinement case shocked Taiwan.",
        "sources": [
          "股感",
          "TVBS",
          "法務部打詐新四法"
        ]
      },
      {
        "id": "EV_2022_covid_omicron",
        "year": 2022,
        "year_end": 2022,
        "category": "epidemic_economy",
        "regions": [
          "ALL"
        ],
        "title": "Omicron 共存浪潮",
        "summary": "2022 年政府轉向與病毒共存，Omicron 疫情快速擴散，累計確診逾半數國人；全年因 COVID-19 死亡 14,667 人，平均壽命減少 1.02 歲。",
        "institutional_aftermath": "高齡與長照機構防疫、口服抗病毒藥物配置成為檢討重點。",
        "gameplay_impact": {
          "happiness_delta": -2,
          "health_delta": -1
        },
        "sensitive": true,
        "cultural_footnote_en": "The 2022 Omicron wave infected over half the population and cut life expectancy by 1.02 years.",
        "sources": [
          "衛生福利部統計處"
        ]
      },
      {
        "id": "EV_2023_metoo_taiwan",
        "year": 2023,
        "year_end": 2023,
        "category": "society_rights",
        "regions": [
          "ALL"
        ],
        "title": "台灣 #MeToo 浪潮與性平三法修法",
        "summary": "2023年中起由政壇延燒至演藝、媒體、學界與職場的集體性騷擾揭露運動，打破多年職場沉默文化。",
        "institutional_aftermath": "立法院於2023年7月火速修訂「性平三法」並於2024年3月8日全面上路，加重權勢性騷刑責與雇主防治義務。",
        "gameplay_impact": {},
        "sensitive": true,
        "cultural_footnote_en": "Taiwan's 2023 #MeToo wave swept politics, media, and workplaces, prompting sweeping amendments to three gender-equality laws effective March 2024.",
        "sources": [
          "勞動部與衛福部性平三法專區"
        ]
      },
      {
        "id": "EV_2023_imb_scam",
        "year": 2023,
        "year_end": 2023,
        "category": "crime_finance",
        "regions": [
          "ALL"
        ],
        "title": "im.B 吸金案與網路假投資",
        "summary": "2023 年 im.B 假債權平台吸金逾 25 億元案爆發，逾 5,000 人受害；通訊軟體上的飆股群組與假投資廣告同時氾濫。",
        "institutional_aftermath": "立法院於2024年7月三讀通過「打詐新四法」，重懲高額詐欺、強化科技偵查並限制人頭帳戶金融權限。",
        "gameplay_impact": {
          "happiness_delta": -1
        },
        "sensitive": true,
        "cultural_footnote_en": "The 2023 im.B peer-to-peer fraud left over 5,000 victims and spurred Taiwan's 2024 anti-fraud acts.",
        "sources": [
          "法務部打詐新四法",
          "中央社"
        ],
        "protagonist_involvement": {
          "base_prob": 0.05,
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
          ],
          "pi_track": "systemic"
        }
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
        "gameplay_impact": {},
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
          "base_prob": 0.04,
          "regions": [
            "east_islands"
          ],
          "age_range": [
            18,
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
              "weight": 0.008,
              "severity": "fatal",
              "narrative": "0403 花蓮規模 7.2 強震襲擊時行經落石路段，不幸於強震中罹難。",
              "fatal": true,
              "death_cause": "2024 年 0403 花蓮規模 7.2 強震"
            }
          ],
          "pi_track": "systemic"
        },
        "impact_prob": {
          "east_islands": 0.03
        },
        "disaster_name": "0403 花蓮強震"
      },
      {
        "id": "EV_2025_kaikai_verdict",
        "year": 2025,
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
        "id": "EV_2025_super_aged_ai_tariff",
        "year": 2025,
        "year_end": 2025,
        "category": "economy_society_disaster",
        "regions": [
          "ALL",
          "central",
          "east_islands"
        ],
        "title": "邁入超高齡社會、AI 出口狂潮、對等關稅與光復洪災",
        "summary": "2025年台灣65+人口達20.06%正式進入超高齡社會、總生育率跌至0.695；8月美對台暫時性20%對等關稅致傳產無薪假8,543人，9月樺加沙颱風致花蓮光復鄉19死；但AI出口強勁帶動全年經濟成長7.37%。",
        "institutional_aftermath": "形成科技業財富效應與傳產減班、少子高齡化並存的「K型台灣」時代面貌。",
        "gameplay_impact": {
          "tech_wage_bonus": 1.12,
          "trad_mfg_unpaid_leave_prob": 0.08
        },
        "sensitive": false,
        "cultural_footnote_en": "In 2025, Taiwan officially entered a 'super-aged' society (>20% aged 65+) with a 0.695 fertility rate, while AI exports drove 7.37% GDP growth despite tariff pressures on traditional industries.",
        "sources": [
          "聯合報",
          "公視新聞",
          "天下雜誌"
        ],
        "impact_regions": [
          "east_islands"
        ],
        "disaster_year": 2025,
        "impact_prob": {
          "east_islands": 0.012
        },
        "disaster_name": "光復鄉洪災"
      },
      {
        "id": "EV_2025_scam_record",
        "year": 2025,
        "year_end": 2025,
        "category": "crime_finance",
        "regions": [
          "ALL"
        ],
        "title": "詐騙財損近 900 億元",
        "summary": "2025 年全台詐騙受理 16.2 萬件、財損近 900 億元，假投資與深偽影片成為主要手法，銀行臨櫃關懷提問成為日常。",
        "institutional_aftermath": "打詐新四法上路後持續檢討平台責任與跨境偵查。",
        "gameplay_impact": {
          "happiness_delta": -1
        },
        "sensitive": true,
        "cultural_footnote_en": "Taiwan logged 162,000 scam cases and nearly NT$90 billion in losses in 2025.",
        "sources": [
          "內政部警政署165"
        ]
      },
      {
        "id": "EV_2026_taiex_50k_uni_closure",
        "year": 2026,
        "year_end": 2026,
        "category": "economy_education",
        "regions": [
          "ALL"
        ],
        "title": "台股逼近五萬點、關稅降至 15% 與少子化私校停招潮",
        "summary": "2026年1月台美關稅談判降至15%緩解傳產壓力；AI超級週期推升台股於10月盤中觸及49,968.92點新高，但少子化浪潮亦使中華大學等私立大專於2026年宣布停招。",
        "institutional_aftermath": "資本市場繁榮與高教退場潮並存，凸顯台灣人口少子化與產業集中化轉折。",
        "gameplay_impact": {
          "tech_wage_bonus": 1.05
        },
        "sensitive": false,
        "cultural_footnote_en": "In 2026, tariff relief and the AI boom briefly lifted Taiwan's stock index near 50,000, even as declining births forced private universities like Chung Hua University to halt admissions.",
        "sources": [
          "科技新報",
          "優分析",
          "工商時報"
        ]
      }
    ]
  },
  "decisions": {
    "meta": {
      "schema_version": "1.0.0",
      "total_decisions": 34,
      "design_principle": "選項僅改變後續機率與參數權重，不保證單一結果；支援一卡多年代變體（era_variants）。",
      "era_choices_note": "時代抉擇卡分三級：era＝時代大事、trend＝時代日常（那個年代的社會期待與生活趨勢下會遇到的選擇）、future＝2027 年後的未來卡（虛構推演，部分需先發生對應的未來事件）。依年份區間＋身分、地點、職業、性格條件觸發，不是每個人都會遇到。chance 為符合條件時每年出現的機率，trait_chance 依性格調整；選項的 roll／outcomes 依屬性與性格決定成敗，可延後到指定年份才發生。"
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
        "id": "D01B_youth_parttime_request",
        "stage": "education",
        "title": "滿法定打工年齡：向父母提出打工申請？",
        "conditions": {
          "age_range": [
            15,
            17
          ],
          "requires_student_no_parttime": true
        },
        "options": [
          {
            "key": "persuade_parents_parttime",
            "label": "向父母提出課餘打工計畫並爭取同意（滿 15 歲須父母同意，依人際、知識與家境判定成功率）",
            "effects": {
              "attempt_parttime_approval": true
            }
          },
          {
            "key": "focus_on_studies",
            "label": "暫不打工，專心課業與校園生活（由父母負擔日常開銷，出社會前維持零個人資產）",
            "effects": {
              "knowledge": 4,
              "happiness": 2
            }
          }
        ]
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
            "key": "stem_eng",
            "label": "電資／理工／資訊工程學門",
            "effects": {
              "major_group": "stem_eng",
              "starting_pay_mult": 1.04,
              "happiness": -3
            },
            "era_labels": [
              {
                "max_year": 1979,
                "label": "理工／電機工程學門"
              },
              {
                "min_year": 1980,
                "label": "電資／理工／資訊工程學門"
              }
            ]
          },
          {
            "key": "med_doctor",
            "label": "醫學／牙醫系（六至七年，錄取門檻最高）",
            "requires_knowledge_min": 84,
            "effects": {
              "major_group": "med_health",
              "happiness": -5
            }
          },
          {
            "key": "health_allied",
            "label": "護理／藥學／醫技學系",
            "effects": {
              "major_group": "med_health",
              "happiness": -2
            }
          },
          {
            "key": "law",
            "label": "法律學系",
            "requires_knowledge_min": 62,
            "effects": {
              "major_group": "humanities_biz",
              "happiness": -1
            }
          },
          {
            "key": "biz",
            "label": "商管／會計／財金學系",
            "effects": {
              "major_group": "humanities_biz",
              "happiness": 1
            }
          },
          {
            "key": "arts",
            "label": "人文／社會／藝術／傳播學系",
            "effects": {
              "major_group": "humanities_biz",
              "happiness": 4
            }
          },
          {
            "key": "public_funded",
            "label": "軍警校或公費師範（畢業分發，服務年限內不能離職）",
            "effects": {
              "major_group": "public_funded"
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
            "label": "先就讀錄取的後段校系，日後再拚轉學考或研究所",
            "effects": {
              "enroll_backup_uni": true,
              "knowledge": 2,
              "happiness": -1
            },
            "requires_year_min": 1997
          },
          {
            "key": "work_or_military",
            "label": "直接就業或先去當兵",
            "effects": {
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
            30
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
            "effects": {},
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
              "savings_rate_bonus": 0.15,
              "happiness": -4
            },
            "requires_stats": {
              "health": 55
            },
            "requires_able_body": true
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
              "long_term_wage_mult": 1.06,
              "knowledge": 10
            },
            "requires_stats": {
              "knowledge": 60
            }
          },
          {
            "key": "study_abroad",
            "label": "出國留學（需Q4–Q5資源或學貸）",
            "effects": {
              "money_delta_ratio": -0.45,
              "long_term_wage_mult": 1.14
            },
            "requires_stats": {
              "knowledge": 65
            }
          },
          {
            "key": "direct_work",
            "label": "直接進入職場",
            "effects": {
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
          ],
          "career_not_in": [
            "car_civil_teacher",
            "car_farmer_fisher"
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
              "wage_mult": 1.08,
              "relationships": -6
            },
            "era_labels": [
              {
                "max_year": 1979,
                "label": "離鄉北上，到台北或桃園的工廠、商行找頭路"
              },
              {
                "min_year": 1980,
                "max_year": 1999,
                "label": "離鄉北上，到雙北公司行號或新竹科學園區打拚"
              },
              {
                "min_year": 2000,
                "label": "北漂雙北或赴桃竹苗科學園區打拚"
              }
            ]
          },
          {
            "key": "stay_home",
            "label": "留在家鄉工作並住家裡",
            "effects": {
              "relationships": 6,
              "happiness": 4,
              "career_ceiling_local": true
            }
          }
        ],
        "era_titles": [
          {
            "max_year": 1999,
            "label": "離鄉北上，還是留在家鄉？"
          },
          {
            "min_year": 2000,
            "label": "北漂還是留鄉？"
          }
        ]
      },
      {
        "id": "D07_career_track",
        "stage": "career",
        "title": "初入職場：選擇你的職業與實業跑道",
        "conditions": {
          "age_range": [
            18,
            45
          ],
          "requires_working_adult": true
        },
        "options": [
          {
            "key": "tech_finance",
            "label": "進科技大廠或金融保險業",
            "effects": {
              "health": -6,
              "work_hours_high": true
            },
            "era_labels": [
              {
                "max_year": 1979,
                "label": "投入外銷貿易業務或成長中的出口產業（高績效高工時）"
              },
              {
                "min_year": 1980,
                "max_year": 1986,
                "label": "進入金融銀行、外銷貿易或電子新興產業（高薪高壓）"
              },
              {
                "min_year": 1987,
                "label": "進入科技大廠（半導體／軟體）或金融保險業（高薪高工時）"
              }
            ]
          },
          {
            "key": "civil_service",
            "label": "全職備考高普考／國營事業",
            "effects": {
              "exam_prep_years": 1
            }
          },
          {
            "key": "family_biz_startup",
            "label": "接家業或創業當頭家",
            "effects": {}
          }
        ]
      },
      {
        "id": "D07B_career_switch",
        "stage": "career",
        "title": "職涯轉職契機：跨界跳槽還是深耕本業？",
        "conditions": {
          "age_range": [
            25,
            56
          ],
          "requires_working_adult": true,
          "min_work_years": 4
        },
        "options": [
          {
            "key": "stay_current_grow",
            "label": "留在原領域累積資深年資（穩定調薪 +8%）",
            "effects": {
              "wage_mult": 1.04,
              "happiness": 2
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
          ],
          "requires_working_adult": true,
          "career_in": [
            "car_export_sales",
            "car_office_white_collar",
            "car_hsinchu_semi",
            "car_software_remote",
            "car_finance_broker"
          ]
        },
        "era_variants": [
          {
            "variant_id": "sea_taigan",
            "year_range": [
              1987,
              1992
            ],
            "label_context": "公司到東南亞設廠，詢問你是否願意外派"
          },
          {
            "variant_id": "china_taigan",
            "year_range": [
              1993,
              2019
            ],
            "label_context": "西進中國大陸或赴東南亞設廠擔任台幹"
          },
          {
            "variant_id": "us_jp_fab",
            "year_range": [
              2020,
              2045
            ],
            "label_context": "赴美國亞利桑那、日本熊本或歐洲半導體／科技據點外派"
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
            },
            "requires_stats": {
              "health": 40
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
              "wage_mult": 0.92,
              "happiness": 8,
              "relationships": 10
            },
            "era_labels": [
              {
                "max_year": 2004,
                "label": "辭去北部工作返鄉就業，陪伴家人（薪資打折但省房租）"
              },
              {
                "min_year": 2005,
                "label": "返鄉就業或轉遠距工作照顧家人（薪資微調、生活壓力大減）"
              }
            ]
          }
        ],
        "era_titles": [
          {
            "max_year": 1999,
            "label": "離鄉多年：要不要搬回老家？"
          },
          {
            "min_year": 2000,
            "label": "北漂十年的返鄉掙扎"
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
          ],
          "requires_working_adult": true,
          "career_not_in": [
            "car_civil_teacher",
            "car_doctor_pharma",
            "car_lawyer_cpa",
            "car_cpa",
            "car_pharma_medtech",
            "car_healthcare_ltc"
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
            ],
            "requires_stats": {
              "health": 35
            }
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
              "debt_added_ratio": 0.35
            }
          }
        ],
        "self_employed_variant": {
          "title": "景氣寒冬：訂單與客源驟減",
          "labels": {
            "gig_side_job": "縮減規模、兼差接零工撐過淡季",
            "resign_retrain": "收掉生意或暫停耕作，轉行找工作",
            "borrow_credit": "借款周轉撐過景氣谷底"
          }
        }
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
          "health_below": 60,
          "requires_working_adult": true
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
        ],
        "career_labels": {
          "default": [
            "調整步調、準時下班並規律運動與定期健檢",
            "趁還能拚繼續加班多賺一點"
          ],
          "tech": [
            "降薪換準時下班、規律運動與定期健檢",
            "趁還能拚繼續加班領分紅"
          ],
          "farm": [
            "減少耕作面積、規律看診與休息",
            "農忙照舊，先撐過這一季"
          ],
          "civil": [
            "申請調整職務、規律運動與定期健檢",
            "硬撐年資與考績，繼續加班"
          ],
          "self": [
            "少接一些單，規律運動與定期健檢",
            "趁訂單多繼續日夜趕工"
          ]
        }
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
              "invest_style": "deposit"
            },
            "era_labels": [
              {
                "max_year": 1986,
                "label": "存銀行／郵局高利定存（穩健保本、享當年代高利率）"
              },
              {
                "min_year": 1987,
                "max_year": 2019,
                "label": "銀行定存或儲蓄險（依當年代利率計算）"
              },
              {
                "min_year": 2020,
                "label": "銀行定存、高利活存或儲蓄險（依當年代利率計算）"
              }
            ]
          },
          {
            "key": "etf_dca",
            "label": "定期定額投資台股大盤",
            "effects": {
              "invest_style": "index_etf"
            },
            "era_labels": [
              {
                "max_year": 1961,
                "label": "參加親友民間互助會（標會）或買黃金保值"
              },
              {
                "min_year": 1962,
                "max_year": 1985,
                "label": "分批買進台股大型績優股（水泥、紡織、金融股）"
              },
              {
                "min_year": 1986,
                "max_year": 2002,
                "label": "定期買進台股權值股或開放式共同基金"
              },
              {
                "min_year": 2003,
                "max_year": 2019,
                "label": "定期定額台股大盤 ETF（如 0050）"
              },
              {
                "min_year": 2020,
                "label": "定期定額台股／海外大盤 ETF（如 0050）"
              }
            ]
          },
          {
            "key": "margin_speculation",
            "label": "融資槓桿／聽明牌重壓飆股",
            "effects": {
              "invest_style": "leverage"
            },
            "era_labels": [
              {
                "max_year": 1961,
                "label": "借錢投入高息民間合會與地下拆借（高報酬高倒會風險）"
              },
              {
                "min_year": 1962,
                "max_year": 1979,
                "label": "聽街頭消息重壓熱門股（大起大落風險極高）"
              },
              {
                "min_year": 1980,
                "max_year": 2019,
                "label": "融資槓桿／聽明牌重壓飆股（牛市翻倍、股災易斷頭）"
              },
              {
                "min_year": 2020,
                "label": "融資槓桿／當沖重壓熱門題材股（牛市翻倍、股災易斷頭）"
              }
            ]
          }
        ]
      },
      {
        "id": "D12B_vehicle_purchase",
        "stage": "finance",
        "title": "人生代步工具抉擇：買車、買機車，還是搭大眾運輸？",
        "conditions": {
          "age_range": [
            21,
            38
          ],
          "requires_working_adult": true,
          "no_car_yet": true
        },
        "options": [
          {
            "key": "buy_car",
            "label": "購入一台代步汽車（提升生活品質與通勤便利，須負擔車款與每年養車費）",
            "era_labels": [
              {
                "max_year": 1979,
                "label": "砸重金購入國產／進口房車（此時汽車屬高價奢侈品，養車開銷可觀）"
              },
              {
                "min_year": 1980,
                "max_year": 2009,
                "label": "購入一台國產房車代步（提升通勤舒適度，但增加每年油錢稅金保養費）"
              },
              {
                "min_year": 2010,
                "label": "購入一台國產房車／休旅車代步（通勤便利，須負擔車款與每年油稅保養費）"
              }
            ],
            "requires_vehicle_afford": "car",
            "effects": {
              "buy_vehicle": "car",
              "happiness": 7,
              "health": 2
            }
          },
          {
            "key": "buy_scooter",
            "label": "買一台機車代步通勤（入手門檻親民、保養便宜）",
            "era_labels": [
              {
                "max_year": 1974,
                "label": "買一台國產輕檔車／機車代步（省時省力，入手門檻親民）"
              },
              {
                "min_year": 1975,
                "label": "買一台白牌速克達機車通勤（機動性高、保養費親民）"
              }
            ],
            "requires_vehicle_afford": "scooter",
            "effects": {
              "buy_vehicle": "scooter",
              "happiness": 3
            }
          },
          {
            "key": "public_transit",
            "label": "不買車，繼續搭公車／火車／捷運通勤（省下購車與養車支出）",
            "era_labels": [
              {
                "max_year": 1995,
                "label": "不買車，靠公車、客運、火車或腳踏車通勤（省下購車與養車費）"
              },
              {
                "min_year": 1996,
                "label": "不買車，靠捷運、公車與鐵路通勤（省下購車與養車費）"
              }
            ],
            "effects": {
              "happiness": -1
            }
          }
        ],
        "transit_year_by_region": {
          "north_taipei": 1996,
          "south_kaohsiung": 2008,
          "north_hsinchu": 2017,
          "central": 2021
        }
      },
      {
        "id": "D13_buying_home",
        "stage": "finance",
        "title": "買房的終極算計",
        "conditions": {
          "age_range": [
            25,
            60
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
                "label": "咬牙買蛋黃區（搭配新青安扛 40 年房貸）",
                "max_year": 2026
              },
              {
                "min_year": 2027,
                "label": "咬牙買蛋黃區（搭配青安優惠長年期房貸）"
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
              "liquid_invest_bonus": true
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
            "variant_id": "roscas_1970s",
            "year_range": [
              1970,
              1984
            ],
            "title": "親友招攬高息互助會（標會）",
            "crash_year": "immediate_or_next_year",
            "source_note": "街坊會頭招會，利息比銀行高，但會頭捲款倒會的消息也時有所聞"
          },
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
            "variant_id": "unlisted_1995",
            "year_range": [
              1992,
              2003
            ],
            "title": "未上市股票與投顧老師明牌",
            "crash_year": "immediate_or_next_year",
            "source_note": "盤商兜售未上市科技股，第四台投顧老師天天報明牌"
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
            "variant_id": "crypto_2015",
            "year_range": [
              2015,
              2021
            ],
            "title": "虛擬貨幣與海外高息投資說明會",
            "crash_year": "immediate_or_next_year",
            "source_note": "標榜保證獲利的代幣與海外平台在說明會與社群間流傳"
          },
          {
            "variant_id": "scam_2024",
            "year_range": [
              2022,
              2026
            ],
            "title": "通訊軟體飆股群組與高息債權平台邀約",
            "crash_year": "immediate_or_next_year",
            "source_note": "通訊軟體飆股群組與高息債權平台盛行，主打穩賺不賠話術"
          },
          {
            "variant_id": "deepfake_2027",
            "year_range": [
              2027,
              2060
            ],
            "title": "AI 深偽名人推薦的「保證獲利」投資",
            "crash_year": "immediate_or_next_year",
            "source_note": "以假亂真的名人影片與客服機器人誘導匯款，真假越來越難分辨"
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
            },
            "era_labels": [
              {
                "max_year": 1994,
                "label": "把大半積蓄投進去，甚至抵押房產或向親友借錢加碼"
              },
              {
                "min_year": 1995,
                "label": "把大半積蓄投進去，甚至借信貸加碼"
              }
            ]
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
            "label": "蓋牌續抱度過股災（結果依歷史年份分化）",
            "effects": {},
            "era_labels": [
              {
                "max_year": 2007,
                "label": "不進號子看盤，把股票存摺鎖進抽屜蓋牌續抱（結果依年份分化）"
              },
              {
                "min_year": 2008,
                "max_year": 2011,
                "label": "關掉電腦看盤軟體蓋牌續抱（結果依歷史年份分化）"
              },
              {
                "min_year": 2012,
                "label": "刪掉手機看盤 App 蓋牌續抱（結果依歷史年份分化）"
              }
            ]
          },
          {
            "key": "buy_the_dip",
            "label": "動用預備金進場抄底",
            "effects": {
              "buy_dip_ratio": 0.4
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
          ],
          "requires_working_adult": true
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
            "label": "動用存款選用自費先進療程（復原最佳、大幅壓低致死與失能風險）",
            "requires_med_afford": true,
            "effects": {},
            "era_labels": [
              {
                "max_year": 2000,
                "label": "動用存款選用自費進口特效藥與先進手術療程（復原最佳、大幅壓低致死與失能風險）"
              },
              {
                "min_year": 2001,
                "label": "動用存款選用自費標靶藥／先進療程（復原最佳、大幅壓低致死與失能風險）"
              }
            ]
          },
          {
            "key": "sell_home_for_med",
            "label": "存款不夠——忍痛賣房變現籌措救命自費療程（僅有房者可選）",
            "requires_homeowner_for_med": true,
            "effects": {
              "happiness": -10
            }
          },
          {
            "key": "standard_nhi",
            "label": "無力負擔自費，改採基礎保守治療（存款拮据時有殘疾失能與病情惡化早逝風險）",
            "effects": {},
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
        "id": "D17B_romance_encounter",
        "stage": "family",
        "title": "遇見心動的對象：開啟一段感情嗎？",
        "conditions": {
          "age_range": [
            18,
            62
          ],
          "no_partner_yet": true
        },
        "options": [
          {
            "key": "start_romance",
            "label": "用心經營這段感情，確立穩定交往關係",
            "era_labels": [
              {
                "max_year": 1984,
                "label": "透過親友介紹或聯誼相識，決定認真交往（確立穩定伴侶）"
              },
              {
                "min_year": 1985,
                "max_year": 2004,
                "label": "在校園社團或職場日久生情，決定正式交往（確立穩定伴侶）"
              },
              {
                "min_year": 2005,
                "max_year": 2014,
                "label": "在職場或網路社群聊得投機，決定穩定交往（確立穩定伴侶）"
              },
              {
                "min_year": 2015,
                "label": "透過朋友聚會或交友軟體相識，決定穩定交往（確立穩定伴侶）"
              }
            ],
            "effects": {
              "start_partner": true,
              "happiness": 8,
              "relationships": 8
            },
            "requires_stats": {
              "happiness": 20
            }
          },
          {
            "key": "focus_self",
            "label": "現階段先專注學業與事業，暫時維持單身",
            "effects": {
              "knowledge": 2,
              "happiness": 1,
              "retry_romance_later": true
            }
          }
        ]
      },
      {
        "id": "D18_marriage_choice",
        "stage": "family",
        "title": "步入婚姻嗎？",
        "conditions": {
          "age_range": [
            20,
            64
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
            20,
            52
          ],
          "married": true
        },
        "options": [
          {
            "key": "have_child",
            "label": "生育下一代，迎接家庭新成員",
            "effects": {
              "children_delta": 1,
              "subsidy_post_2026_twd": 100000
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
            "key": "not_now",
            "label": "今年先不要，過一兩年再說",
            "effects": {
              "postpone_child": true
            }
          },
          {
            "key": "dink_pets",
            "label": "選擇不生育，專注兩人生活與財務自由",
            "effects": {
              "no_more_kids": true,
              "savings_rate_bonus": 0.15,
              "happiness": 4
            },
            "era_labels": [
              {
                "max_year": 1989,
                "label": "決定暫不生育，專注兩人工作與存錢生活"
              },
              {
                "min_year": 1990,
                "max_year": 2004,
                "label": "當頂客族，把時間與積蓄留給兩人世界"
              },
              {
                "min_year": 2005,
                "label": "當頂客族／改養毛小孩，保有自由與較高儲蓄率"
              }
            ]
          }
        ]
      },
      {
        "id": "D20_marriage_crisis",
        "stage": "family",
        "title": "婚姻亮紅燈",
        "conditions": {
          "age_range": [
            27,
            60
          ],
          "married": true
        },
        "options": [
          {
            "key": "move_out_counseling",
            "label": "搬離婆家／夫家，尋求溝通修復關係",
            "effects": {
              "repair_prob": 0.65
            },
            "era_labels": [
              {
                "max_year": 1989,
                "label": "搬離婆家／夫家另組小家庭，並請親友長輩從中協調溝通"
              },
              {
                "min_year": 1990,
                "label": "搬離婆家／夫家並尋求專業婚姻諮商修復關係"
              }
            ],
            "era_labels_male": [
              {
                "max_year": 1989,
                "label": "帶著妻小搬出父母家另組小家庭，並請親友從中協調"
              },
              {
                "min_year": 1990,
                "label": "搬出父母家、分擔家務並尋求專業婚姻諮商修復關係"
              }
            ]
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
            30,
            56
          ],
          "has_school_age_child": true,
          "requires_child_age_range": [
            6,
            15
          ]
        },
        "options": [
          {
            "key": "private_cram",
            "label": "送私立名校與全科課後補習",
            "effects": {},
            "requires_cram_afford": true,
            "era_labels": [
              {
                "max_year": 1994,
                "label": "送私立名校、才藝班與全科升學補習班"
              },
              {
                "min_year": 1995,
                "label": "送私校、雙語安親與全科補習"
              }
            ]
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
            "EV_2009_morakot_88_flood",
            "EV_2024_hualien_quake_housing_peak",
            "EV_2025_super_aged_ai_tariff"
          ],
          "age_range": [
            18,
            95
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
          ],
          "age_range": [
            18,
            95
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
        "title": "三明治世代的父母照護難題",
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
            "label": "聘請專業看護或安排入住養護機構",
            "effects": {
              "monthly_care_cost_twd_2025": 35000
            },
            "requires_caregiver_afford": true,
            "era_labels": [
              {
                "max_year": 1991,
                "label": "聘請本籍看護或安排入住安養機構（每月固定高額支出）"
              },
              {
                "min_year": 1992,
                "max_year": 2006,
                "label": "聘請外籍看護或送安養機構（保住職場年資但支出高）"
              },
              {
                "min_year": 2007,
                "label": "聘外籍看護或送長照機構（每月固定支出、保住工作）"
              }
            ]
          },
          {
            "key": "quit_fulltime_care",
            "label": "辭職回家全職照顧父母",
            "effects": {
              "job_lost": true,
              "health": -12,
              "happiness": -15,
              "relationships": 6
            },
            "requires_stats": {
              "health": 35
            }
          },
          {
            "key": "share_with_siblings",
            "label": "與手足輪流照料分擔壓力（獨生子女鎖定不可選）",
            "requires_siblings": true,
            "effects": {
              "monthly_care_cost_twd_2025": 12000,
              "health": -3,
              "relationships": 4
            },
            "era_labels": [
              {
                "max_year": 2006,
                "label": "與手足輪流分擔照護與醫藥費（獨生子女鎖定不可選）"
              },
              {
                "min_year": 2007,
                "label": "與手足輪流＋申請政府長照資源（獨生子女鎖定不可選）"
              }
            ]
          }
        ]
      },
      {
        "id": "D25_retirement_timing",
        "stage": "late_and_crisis",
        "title": "退休時間點抉擇",
        "conditions": {
          "age_range": [
            50,
            90
          ]
        },
        "options": [
          {
            "key": "standard_retire",
            "label": "辦理退休，開始領取老年給付／退休金",
            "effects": {
              "retired": true,
              "health": 8
            },
            "requires_pension_age": true
          },
          {
            "key": "second_career",
            "label": "先不退，轉任較輕鬆的工作（收入減少，幾年後再決定）",
            "effects": {
              "retired": false,
              "income_mult": 0.55,
              "relationships": 5,
              "health": -2
            },
            "requires_stats": {
              "health": 30
            }
          },
          {
            "key": "early_fire",
            "label": "提早財富自由退休（需淨資產達標）",
            "requires_fire_assets": true,
            "effects": {
              "retired": true,
              "happiness": 15,
              "health": 10
            },
            "era_labels": [
              {
                "max_year": 2014,
                "label": "資產充足，提早退休享受人生（需淨資產達標）"
              },
              {
                "min_year": 2015,
                "label": "提早財富自由（FIRE，需淨資產達標）"
              }
            ]
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
            40,
            66
          ],
          "has_school_age_child": true,
          "requires_year_min": 1978,
          "note": "依家庭存款與房產淨值檢定能否負擔子女海外學費與生活費",
          "requires_child_age_range": [
            18,
            24
          ]
        },
        "options": [
          {
            "key": "fund_abroad_full",
            "label": "動用存款全額資助子女赴海外留學圓夢（需流動資產達門檻）",
            "requires_child_abroad_cash": true,
            "effects": {
              "happiness": 10,
              "relationships": 8
            }
          },
          {
            "key": "mortgage_home_for_child",
            "label": "增貸或變賣部分房產／退休老本送子女出國（需有足夠房產淨值）",
            "requires_child_abroad_home": true,
            "effects": {
              "happiness": 6,
              "relationships": 8,
              "health": -4
            }
          },
          {
            "key": "cannot_afford_abroad",
            "label": "存款與薪資有限，只能婉拒留學、讓子女留在台灣升學或自行申貸",
            "effects": {
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
              "happiness": -12,
              "health": -8,
              "relationships": -6
            }
          },
          {
            "key": "foreclosure_auction",
            "label": "無力再繳本息，房屋遭銀行低價法拍（資產大幅折損並留存債務）",
            "effects": {
              "happiness": -28,
              "health": -10
            }
          }
        ]
      },
      {
        "id": "D31_cashflow_debt_crisis",
        "stage": "finance",
        "title": "收支赤字與債務危機：如何度過資金缺口？",
        "conditions": {
          "special": "cashflow_debt_crisis",
          "age_range": [
            20,
            85
          ],
          "note": "當存款持續為負且無持股可變現時觸發，玩家須面對賣車變現、賣房止血、向親友借款或借貸周轉等抉擇"
        },
        "options": [
          {
            "key": "sell_vehicle",
            "label": "忍痛變賣名下汽車／機車籌措現金，並啟動兩年縮衣節食期（僅持有車輛者可選）",
            "requires_vehicle": true,
            "effects": {
              "sell_owned_vehicle": true,
              "happiness": -8,
              "health": -3
            }
          },
          {
            "key": "sell_valuables",
            "label": "忍痛典當／變賣持有的高價金飾、嫁妝或傳家珠寶換現（僅持有貴重資產者可選）",
            "requires_valuables": true,
            "effects": {
              "sell_owned_valuables": true,
              "happiness": -9
            }
          },
          {
            "key": "sell_home_crisis",
            "label": "忍痛降價出售自住房產還清債務，改回租屋生活（僅有房者可選）",
            "requires_homeowner": true,
            "effects": {
              "forced_sell_home": true,
              "happiness": -18,
              "health": -4
            }
          },
          {
            "key": "borrow_relatives",
            "label": "低頭向親友開口借款周轉（免高利但背負沉重人情，需人際 ≥ 45 或家境 Q3 以上）",
            "requires_relative_borrow": true,
            "effects": {
              "borrow_relatives_cash": true,
              "relationships": -12,
              "happiness": -8
            }
          },
          {
            "key": "high_interest_loan",
            "label": "無資產可賣：啟動極致縮衣節食，並辦理借貸／信貸硬撐（高利滾存，債務恐惡化）",
            "era_labels": [
              {
                "max_year": 1994,
                "label": "啟動縮衣節食並向民間高息借貸調頭寸硬撐（利息沉重，債務恐滾雪球擴大）"
              },
              {
                "min_year": 1995,
                "label": "啟動縮衣節食並辦理銀行信貸／信用卡預借現金硬撐（高利滾存，債務恐惡化）"
              }
            ],
            "effects": {
              "take_high_interest_loan": true,
              "happiness": -10,
              "health": -5
            }
          }
        ]
      }
    ],
    "era_choices": [
      {
        "id": "E1953_land_reform_tenant",
        "era_label": "1950 年代 · 耕者有其田",
        "parent_decides": true,
        "title": "耕者有其田：家裡分到了田",
        "desc": "政府實施耕者有其田，家裡租了幾十年的田，終於可以分年繳地價放領給自己耕作。",
        "source": "1953 年《實施耕者有其田條例》：地主土地由政府徵收後，放領給現耕佃農，十年攤還地價。",
        "conditions": {
          "year_range": [
            1953,
            1956
          ],
          "age_range": [
            0,
            6
          ],
          "quintile_range": [
            1,
            2
          ],
          "regions_not_in": [
            "north_taipei"
          ]
        },
        "chance": 0.45,
        "options": [
          {
            "key": "keep_farming",
            "label": "承領耕地，全家繼續務農",
            "auto_weight": 0.7,
            "effects": {
              "happiness": 2,
              "flags": [
                "family_farmland"
              ]
            },
            "text": "父親在田埂上蹲了很久，說這塊地以後就是自己的了。",
            "outcomes": [
              {
                "delay": [
                  24,
                  34
                ],
                "p": 0.35,
                "success": {
                  "effects": {
                    "money": 800000,
                    "happiness": 4
                  },
                  "text": "家裡當年承領的那塊田被劃進都市計畫，地價翻了好幾倍。手足分家後，你也分到一筆錢。"
                }
              }
            ]
          },
          {
            "key": "sell_move_city",
            "label": "領到地不久就賣掉，全家搬進城裡做工",
            "auto_weight": 0.3,
            "effects": {
              "knowledge": 2,
              "hardship": [
                1,
                4
              ],
              "flags": [
                "moved_city_childhood"
              ]
            },
            "text": "城裡的工錢比種田多，但一家人擠在租來的小房間，日子並不輕鬆。"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1953_land_reform_landlord",
        "era_label": "1950 年代 · 耕者有其田",
        "parent_decides": true,
        "title": "耕者有其田：家裡的地被徵收了",
        "desc": "家裡是地主，大部分田地被政府徵收，換回一疊土地債券和四大公營事業的股票。",
        "source": "地主被徵收的土地，以七成實物土地債券、三成台泥、台紙、農林、工礦四大公司股票補償。",
        "conditions": {
          "year_range": [
            1953,
            1956
          ],
          "age_range": [
            0,
            6
          ],
          "quintile_range": [
            4,
            5
          ],
          "regions_not_in": [
            "north_taipei"
          ]
        },
        "chance": 0.45,
        "options": [
          {
            "key": "hold_shares",
            "label": "抱著補償的台泥股票不賣",
            "auto_weight": 0.3,
            "effects": {
              "flags": [
                "family_cement_shares"
              ]
            },
            "text": "大多數地主急著把股票脫手，父親卻把那疊股票鎖進了抽屜。",
            "outcomes": [
              {
                "delay": [
                  20,
                  30
                ],
                "success": {
                  "effects": {
                    "money": 900000,
                    "happiness": 3
                  },
                  "text": "父親當年捨不得賣的台泥股票，幾十年來配股配息，成了家裡最穩的老本，也分了一份給你。"
                }
              }
            ]
          },
          {
            "key": "sell_shares",
            "label": "股價跌跌不休，低價賣掉換現金",
            "auto_weight": 0.7,
            "effects": {
              "quintile_delta": -1,
              "happiness": -2
            },
            "text": "股票換來的現金很快就花完了，家道從此中落。"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1950_military_village",
        "era_label": "1950 年代 · 眷村",
        "parent_decides": true,
        "title": "眷村，還是自謀生路？",
        "desc": "父親隨部隊來台已經好幾年，「反攻大陸」遙遙無期。上級分配了眷舍，同鄉卻勸他退伍出去做點小生意。",
        "source": "1949 年前後約百萬軍民隨國府來台，各地興建眷村安置軍眷；1996 年《國軍老舊眷村改建條例》後陸續改建為國宅。",
        "conditions": {
          "year_range": [
            1950,
            1962
          ],
          "age_range": [
            0,
            8
          ],
          "origin_in": [
            "waisheng"
          ]
        },
        "chance": 0.6,
        "options": [
          {
            "key": "stay_juancun",
            "label": "住進眷村，父親繼續留在軍中",
            "auto_weight": 0.65,
            "effects": {
              "social": 4,
              "flags": [
                "juancun_kid"
              ]
            },
            "text": "竹籬笆裡家家戶戶的門都開著，你在各省口音和隔壁伯伯的麵香裡長大。",
            "outcomes": [
              {
                "at_year": [
                  1998,
                  2008
                ],
                "p": 0.7,
                "success": {
                  "effects": {
                    "money": 300000,
                    "happiness": 2
                  },
                  "text": "眷村改建，父母以優惠價配售到新國宅。老鄰居散了，但家裡多了一份不動產，也貼補了孩子們一些。"
                }
              }
            ]
          },
          {
            "key": "start_business",
            "label": "父親退伍，在市場邊開麵館自謀生路",
            "auto_weight": 0.35,
            "effects": {
              "flags": [
                "family_noodle_shop"
              ]
            },
            "roll": {
              "p": 0.5,
              "success": {
                "effects": {
                  "quintile_delta": 1,
                  "happiness": 3
                },
                "text": "麵館靠一碗牛肉麵做出了口碑，家裡日子越過越好。"
              },
              "fail": {
                "effects": {
                  "hardship": [
                    1,
                    4
                  ],
                  "happiness": -2
                },
                "text": "小店撐了幾年還是收了，父親改去工地打零工。"
              }
            }
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1965_living_room_factory",
        "era_label": "1960–80 年代 · 客廳即工廠",
        "title": "客廳即工廠：放學要不要幫忙做代工？",
        "desc": "家裡接了加工廠的代工，客廳堆滿聖誕燈泡、雨傘骨架和塑膠花。媽媽說大家一起做，按件計酬，月底就能多一筆收入。",
        "source": "1970 年代政府推動「客廳即工廠」，家庭代工撐起許多中小企業的外銷訂單。",
        "conditions": {
          "year_range": [
            1965,
            1986
          ],
          "age_range": [
            8,
            14
          ],
          "quintile_range": [
            1,
            3
          ]
        },
        "chance": 0.18,
        "options": [
          {
            "key": "help_family",
            "label": "放學就坐下來一起趕工",
            "auto_weight": 0.6,
            "trait_weight": {
              "family_first": 1.8,
              "workaholic": 1.4
            },
            "effects": {
              "knowledge": -3,
              "social": 2,
              "health": -1,
              "hardship_relief": 1,
              "flags": [
                "childhood_piecework"
              ]
            },
            "text": "你的手很快就學會了，童年的晚上都是燈泡和膠水的味道，家裡的日子也鬆了一些。"
          },
          {
            "key": "study_first",
            "label": "先把功課寫完，有空再幫忙",
            "auto_weight": 0.35,
            "trait_weight": {
              "cautious": 1.4,
              "sensitive_introvert": 1.3
            },
            "effects": {
              "knowledge": 3,
              "happiness": -1
            },
            "text": "你趴在代工零件旁邊寫作業，媽媽說：「讀冊卡好，以後免像阮這款。」"
          },
          {
            "key": "sneak_out",
            "label": "偷溜出去跟鄰居小孩玩",
            "auto_weight": 0.12,
            "trait_weight": {
              "sociable": 2.5,
              "risk_taker": 1.5
            },
            "effects": {
              "social": 3,
              "happiness": 3,
              "knowledge": -1
            },
            "text": "你被抓回來罵了一頓，但那年夏天的大水溝和稻田，是你最記得的童年。"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1963_eldest_sacrifice",
        "era_label": "1960–70 年代 · 長子長女",
        "title": "家裡撐不住了：要休學去工作，供弟妹讀書嗎？",
        "desc": "你是家裡最大的孩子之一，底下還有好幾個弟妹。父母的收入撐不起所有孩子的學費，親戚說加工出口區正在大量招工。",
        "source": "1966 年高雄加工出口區設立，大批國中畢業的少女進廠；不少長子長女提早就業，供弟妹升學。",
        "conditions": {
          "year_range": [
            1962,
            1982
          ],
          "age_range": [
            14,
            17
          ],
          "quintile_range": [
            1,
            3
          ],
          "siblings_min": 3,
          "birth_order_max": 2,
          "in_secondary_school": true
        },
        "chance": 0.35,
        "sex_chance": {
          "F": 1.5
        },
        "options": [
          {
            "key": "quit_for_siblings",
            "label": "休學進工廠，把薪水寄回家",
            "auto_weight": 0.45,
            "trait_weight": {
              "family_first": 2.2,
              "cautious": 0.7
            },
            "effects": {
              "quit_school_to_work": true,
              "social": 3,
              "happiness": -4,
              "flags": [
                "eldest_sacrifice"
              ]
            },
            "text": "你把書包收進衣櫃最上層。第一個月的薪水袋，你原封不動交給了媽媽。",
            "outcomes": [
              {
                "delay": [
                  22,
                  30
                ],
                "success": {
                  "effects": {
                    "happiness": 8,
                    "social": 4,
                    "money": 300000
                  },
                  "text": "當年你休學供他們讀書的弟妹都成家立業了。過年時他們塞給你一個厚厚的紅包：「沒有你，就沒有我們。」"
                }
              }
            ]
          },
          {
            "key": "night_school",
            "label": "白天上班、晚上念夜校，兩頭兼顧",
            "auto_weight": 0.3,
            "trait_weight": {
              "workaholic": 2.0
            },
            "effects": {
              "health": -4,
              "knowledge": -2,
              "social": 2,
              "money": 40000,
              "flags": [
                "part_time_job",
                "part_time_approved",
                "night_school_teen"
              ]
            },
            "text": "你每天清晨進廠、晚上趕去夜校，在公車上睡著是常有的事。"
          },
          {
            "key": "keep_studying",
            "label": "堅持把書念完，家裡再想辦法",
            "auto_weight": 0.25,
            "trait_weight": {
              "sensitive_introvert": 1.3,
              "cautious": 1.2
            },
            "effects": {
              "knowledge": 2,
              "happiness": -2,
              "hardship": [
                1,
                3
              ]
            },
            "text": "爸媽多兼了一份工，你知道自己這張畢業證書，是全家一起付的學費。"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1971_un_exodus",
        "era_label": "1970 年代 · 退出聯合國",
        "title": "退出聯合國之後：要不要辦移民？",
        "desc": "{year} 年，報紙天天在談國際局勢。身邊有人賣掉房子辦依親移民，也有人把存款偷偷換成美金。",
        "source": "1971 年退出聯合國、1979 年台美斷交，兩度掀起移民與資金外移潮。當時新台幣兌美元約 36～40 元，1980 年代後期升值到 26 元左右。",
        "conditions": {
          "year_range": [
            1971,
            1980
          ],
          "age_range": [
            22,
            50
          ],
          "quintile_range": [
            3,
            5
          ],
          "never_abroad": true,
          "working": true,
          "min_liquid_twd_2025": 60000
        },
        "chance": 0.2,
        "trait_chance": {
          "cautious": 1.5,
          "risk_taker": 1.2
        },
        "options": [
          {
            "key": "emigrate_us",
            "label": "跟著親戚辦依親移民，去美國重新開始",
            "auto_weight": 0.12,
            "trait_weight": {
              "risk_taker": 1.6,
              "family_first": 0.6
            },
            "requires": {
              "quintile_min": 4,
              "unmarried_or_no_kids": true
            },
            "effects": {
              "emigrate": "USA"
            },
            "text": "你在松山機場跟家人揮手，手提箱裡裝著幾件衣服和一包家鄉的茶葉。"
          },
          {
            "key": "buy_usd",
            "label": "人留在台灣，但把一半存款換成美金放著",
            "auto_weight": 0.3,
            "trait_weight": {
              "cautious": 2.0
            },
            "effects": {
              "usd_hedge_ratio": 0.5
            },
            "text": "你跑了好幾家銀樓，把一疊台幣換成綠色的美鈔，藏在衣櫃夾層裡。",
            "outcomes": [
              {
                "at_year": [
                  1987,
                  1989
                ],
                "success": {
                  "effects": {
                    "usd_hedge_loss": 0.3
                  },
                  "text": "新台幣一路升值，從 40 元升到 26 元，當年換的美金換回台幣，硬是縮水了三成。"
                }
              }
            ]
          },
          {
            "key": "stay_build",
            "label": "留在台灣打拚，相信會越來越好",
            "auto_weight": 0.58,
            "trait_weight": {
              "civic_minded": 1.4,
              "workaholic": 1.3
            },
            "effects": {
              "happiness": 2,
              "social": 2
            },
            "text": "你把移民的表格收進抽屜，第二天照常去上班。",
            "outcomes": [
              {
                "at_year": [
                  1986,
                  1990
                ],
                "success": {
                  "effects": {
                    "happiness": 4
                  },
                  "text": "「台灣錢淹腳目」的年代來了。當年沒走的你，剛好趕上經濟起飛。"
                }
              }
            ]
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1976_suitcase_trade",
        "era_label": "1970–80 年代 · 一卡皮箱走天下",
        "title": "一卡皮箱走天下：要不要自己出來接單？",
        "desc": "你在公司做了幾年，熟悉了工廠和客戶。一位國外買主私下說，只要你拿得出樣品和報價單，訂單就給你做。",
        "source": "1970–80 年代，許多中小企業老闆提著一只皮箱跑遍世界各地展覽接單，撐起台灣的外銷奇蹟。",
        "conditions": {
          "year_range": [
            1975,
            1990
          ],
          "age_range": [
            24,
            45
          ],
          "working": true,
          "careers_in": [
            "car_export_sales",
            "car_office_white_collar",
            "car_epz_worker",
            "car_craft_apprentice",
            "car_finance_broker"
          ],
          "edu_min": 2
        },
        "chance": 0.22,
        "trait_chance": {
          "risk_taker": 2.0,
          "cautious": 0.4,
          "workaholic": 1.3
        },
        "options": [
          {
            "key": "start_trading",
            "label": "辭職，拎著皮箱去國外跑展覽接單",
            "auto_weight": 0.3,
            "trait_weight": {
              "risk_taker": 2.5,
              "cautious": 0.3,
              "workaholic": 1.5
            },
            "effects": {
              "money": -300000,
              "work_hours_high": true
            },
            "roll": {
              "p": 0.45,
              "trait_p": {
                "risk_taker": 0.05,
                "workaholic": 0.08,
                "sociable": 0.06,
                "cautious": -0.05
              },
              "stat_p": {
                "social": 0.004,
                "knowledge": 0.004
              },
              "success": {
                "effects": {
                  "assign_career": "car_sme_boss",
                  "career_mult": 1.2,
                  "happiness": 8
                },
                "text": "第一張訂單成交了。幾年後你有了自己的貿易行，名片上印著「總經理」。"
              },
              "fail": {
                "effects": {
                  "money": -400000,
                  "happiness": -8,
                  "temp_unemployed_years": 1
                },
                "text": "跑了兩年展覽，訂單時有時無，積蓄見底，只好回頭找工作。"
              }
            },
            "requires_stats": {
              "social": 50,
              "health": 40
            }
          },
          {
            "key": "stay_company",
            "label": "留在公司，穩穩領薪水",
            "auto_weight": 0.7,
            "trait_weight": {
              "cautious": 1.8,
              "family_first": 1.3
            },
            "effects": {
              "happiness": -1
            },
            "text": "你婉拒了買主。往後幾年，你常想起那只沒提起來的皮箱。"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1986_dajiale",
        "era_label": "1980 年代 · 大家樂",
        "title": "大家樂：這期要不要簽？",
        "desc": "巷口雜貨店擠滿了人，大家拿著愛國獎券的號碼猜明牌，連土地公廟、大樹公前都有人燒香求號碼。",
        "source": "1985–1987 年「大家樂」以愛國獎券開獎號碼為依據，全台瘋狂簽賭；1987 年底愛國獎券停售。",
        "conditions": {
          "year_range": [
            1985,
            1988
          ],
          "age_range": [
            18,
            70
          ]
        },
        "chance": 0.35,
        "trait_chance": {
          "risk_taker": 2.0,
          "cautious": 0.3,
          "sociable": 1.4
        },
        "options": [
          {
            "key": "small_bet",
            "label": "小簽一點，玩玩就好",
            "auto_weight": 0.4,
            "trait_weight": {
              "sociable": 1.5
            },
            "roll": {
              "p": 0.15,
              "success": {
                "effects": {
                  "money": 60000,
                  "happiness": 4
                },
                "text": "居然簽中了！你請整條巷子的人喝汽水。"
              },
              "fail": {
                "effects": {
                  "money": -15000
                },
                "text": "沒中，就當繳學費。"
              }
            }
          },
          {
            "key": "big_bet",
            "label": "到處求明牌，押重本",
            "auto_weight": 0.08,
            "trait_weight": {
              "risk_taker": 3.0,
              "cautious": 0.2
            },
            "roll": {
              "p": 0.06,
              "success": {
                "effects": {
                  "money": 800000,
                  "happiness": 10
                },
                "text": "冷門號碼開出來了，你一夜之間多了一大筆錢。"
              },
              "fail": {
                "effects": {
                  "money_liquid_ratio": -0.25,
                  "money": -60000,
                  "happiness": -8
                },
                "text": "明牌一期一期落空，越簽越大，存款少了一大截。"
              }
            }
          },
          {
            "key": "be_bookie",
            "label": "自己當組頭收簽單",
            "auto_weight": 0.03,
            "trait_weight": {
              "risk_taker": 3.0,
              "sociable": 1.5
            },
            "roll": {
              "p": 0.55,
              "stat_p": {
                "social": 0.004
              },
              "success": {
                "effects": {
                  "money": 500000,
                  "social": -3
                },
                "text": "這幾期都是你在收錢，但你也開始擔心警察哪天上門。"
              },
              "fail": {
                "effects": {
                  "money": -600000,
                  "happiness": -10,
                  "social": -6
                },
                "text": "有人簽中大獎，你賠不出來，只好躲債好一陣子。"
              }
            },
            "requires_stats": {
              "social": 60
            }
          },
          {
            "key": "no_bet",
            "label": "不碰，辛苦錢不能這樣花",
            "auto_weight": 0.49,
            "trait_weight": {
              "cautious": 2.0,
              "family_first": 1.3
            },
            "effects": {
              "happiness": -1
            },
            "text": "你看著隔壁鄰居天天去廟裡求明牌，自己繼續上工。"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1987_stock_mania",
        "era_label": "1980 年代 · 台灣錢淹腳目",
        "title": "台股衝破萬點：全民瘋股票",
        "desc": "號子裡擠滿了人，菜籃族、上班族下午都在看盤。報紙說股市一年漲了好幾倍，身邊的人好像都在賺錢。",
        "source": "台股加權指數從 1986 年的 1000 點，漲到 1990 年 2 月的 12682 點；同年 10 月跌到 2485 點。",
        "conditions": {
          "year_range": [
            1986,
            1989
          ],
          "age_range": [
            22,
            65
          ],
          "min_liquid_twd_2025": 150000
        },
        "chance": 0.4,
        "trait_chance": {
          "risk_taker": 1.8,
          "cautious": 0.6,
          "sociable": 1.2
        },
        "options": [
          {
            "key": "quit_fulltime",
            "label": "辭掉工作，每天去號子當全職股民",
            "auto_weight": 0.03,
            "trait_weight": {
              "risk_taker": 3.0,
              "cautious": 0.1
            },
            "requires": {
              "working": true
            },
            "effects": {
              "to_stock_ratio": 0.9,
              "quit_job_years": 2,
              "happiness": 6,
              "flags": [
                "stock_mania_all_in"
              ]
            },
            "text": "你遞出辭呈，把存款幾乎全押進股市，每天下午準時坐在號子的電視牆前。"
          },
          {
            "key": "mortgage_leverage",
            "label": "拿房子去增貸，加碼股票",
            "auto_weight": 0.05,
            "trait_weight": {
              "risk_taker": 2.5,
              "cautious": 0.2
            },
            "requires": {
              "homeowner": true
            },
            "effects": {
              "mortgage_draw_ratio": 0.3,
              "to_stock_ratio": 0.6
            },
            "text": "銀行說房子還能再貸一筆。你把貸款和存款一起丟進了股市。"
          },
          {
            "key": "follow_small",
            "label": "拿一部分存款跟著買",
            "auto_weight": 0.42,
            "trait_weight": {
              "sociable": 1.3
            },
            "effects": {
              "to_stock_ratio": 0.35
            },
            "text": "同事報的明牌，你買了幾張。"
          },
          {
            "key": "stay_out",
            "label": "不碰，看別人賺就好",
            "auto_weight": 0.5,
            "trait_weight": {
              "cautious": 2.2
            },
            "effects": {
              "happiness": -2
            },
            "text": "你看著同事一個個換車，心裡有點不是滋味。",
            "outcomes": [
              {
                "at_year": [
                  1990,
                  1991
                ],
                "success": {
                  "effects": {
                    "happiness": 4
                  },
                  "text": "1990 年股市崩盤，身邊好幾個朋友賠掉了房子。你慶幸當年沒跟。"
                }
              }
            ]
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1988_mainland_visit",
        "era_label": "1980 年代 · 開放大陸探親",
        "title": "開放大陸探親：要陪父親回老家嗎？",
        "desc": "政府開放大陸探親了。父親離家快四十年，每晚拿著泛黃的家書，說想回去看看還在的親人。",
        "source": "1987 年 11 月開放赴大陸探親，數十萬老兵返鄉，許多人帶著積蓄與電器「三大件、五小件」回鄉。",
        "conditions": {
          "year_range": [
            1987,
            1995
          ],
          "age_range": [
            18,
            60
          ],
          "origin_in": [
            "waisheng"
          ],
          "father_alive": true
        },
        "chance": 0.5,
        "trait_chance": {
          "family_first": 1.5
        },
        "options": [
          {
            "key": "go_with_gifts",
            "label": "陪父親回鄉，帶著積蓄和電器分給親戚",
            "auto_weight": 0.55,
            "trait_weight": {
              "family_first": 2.0
            },
            "effects": {
              "money": -150000,
              "happiness": 6,
              "social": 4,
              "flags": [
                "visited_mainland"
              ]
            },
            "text": "在老家的村口，父親跪在祖墳前哭了很久。你第一次見到一屋子說著同樣鄉音的親戚。"
          },
          {
            "key": "send_money",
            "label": "工作走不開，讓父親自己回去，匯一點錢",
            "auto_weight": 0.3,
            "trait_weight": {
              "workaholic": 1.8
            },
            "effects": {
              "money": -60000,
              "happiness": 1
            },
            "text": "父親回來後話變少了，只說老家跟記憶裡不一樣了。"
          },
          {
            "key": "dont_go",
            "label": "擔心花費和風險，勸父親別回去",
            "auto_weight": 0.15,
            "trait_weight": {
              "cautious": 2.0
            },
            "effects": {
              "happiness": -4,
              "social": -2
            },
            "text": "父親沒再提起這件事，只是把家書收得更深了。",
            "outcomes": [
              {
                "delay": [
                  3,
                  10
                ],
                "p": 0.45,
                "success": {
                  "effects": {
                    "happiness": -5
                  },
                  "text": "父親後來再也沒有機會回去。整理遺物時，你看到那疊沒寄出去的家書。"
                }
              }
            ]
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1992_go_west",
        "era_label": "1990 年代 · 台商西進",
        "title": "台商西進：工廠要搬去大陸了",
        "desc": "{year} 年，公司宣布把生產線移到東莞和昆山。老闆問你要不要過去當台幹，薪水加倍、包吃包住，一年回台幾次。",
        "desc_variants": [
          {
            "careers_in": [
              "car_sme_boss"
            ],
            "desc": "{year} 年，你的工廠訂單被對岸的低價搶走，同業一家家把廠搬到東莞和昆山。你要跟著過去嗎？"
          }
        ],
        "source": "1990 年代起台商大舉赴大陸設廠；2008 年中國《勞動合同法》上路與金融海嘯後，珠三角掀起台商關廠潮。",
        "conditions": {
          "year_range": [
            1990,
            2007
          ],
          "age_range": [
            25,
            52
          ],
          "working": true,
          "careers_in": [
            "car_epz_worker",
            "car_sme_boss",
            "car_export_sales",
            "car_office_white_collar",
            "car_craft_apprentice"
          ]
        },
        "chance": 0.12,
        "trait_chance": {
          "risk_taker": 1.6,
          "family_first": 0.6,
          "workaholic": 1.4
        },
        "options": [
          {
            "key": "go_taigan",
            "label": "過去當台幹（或把工廠搬過去），一年回台幾次",
            "auto_weight": 0.3,
            "trait_weight": {
              "risk_taker": 1.8,
              "workaholic": 1.6,
              "family_first": 0.4
            },
            "effects": {
              "expat": [
                7,
                1.5
              ],
              "social": -3,
              "marital_strain": 0.35,
              "flags": [
                "taishang"
              ]
            },
            "text": "你在東莞的宿舍裡掛了一本台灣的月曆，算著下次回家的日子。",
            "outcomes": [
              {
                "at_year": [
                  2008,
                  2010
                ],
                "roll": {
                  "p": 0.5,
                  "stat_p": {
                    "knowledge": 0.004
                  },
                  "success": {
                    "effects": {
                      "happiness": 3
                    },
                    "text": "金融海嘯和新的勞動法夾擊，同業倒了一半，你的廠撐了下來。"
                  },
                  "fail": {
                    "effects": {
                      "money": -500000,
                      "happiness": -6,
                      "temp_unemployed_years": 1
                    },
                    "text": "2008 年後工資上漲、訂單銳減，工廠收掉了。你帶著一身疲憊回到台灣。"
                  }
                }
              }
            ],
            "requires_stats": {
              "health": 40
            }
          },
          {
            "key": "stay_taiwan",
            "label": "留在台灣",
            "auto_weight": 0.7,
            "trait_weight": {
              "family_first": 2.0,
              "cautious": 1.4
            },
            "roll": {
              "p": 0.65,
              "career_p": {
                "car_office_white_collar": 0.15,
                "car_export_sales": 0.1
              },
              "success": {
                "effects": {
                  "happiness": 2
                },
                "text": "你留在台灣，換到另一家公司。薪水沒漲，但每天能回家吃飯。"
              },
              "fail": {
                "effects": {
                  "temp_unemployed_years": 1,
                  "happiness": -5
                },
                "text": "台灣這邊的廠關了，你成了關廠工人，失業了一陣子才找到新工作。"
              }
            }
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1995_hsinchu_bonus",
        "era_label": "1990 年代 · 竹科分紅配股",
        "title": "竹科分紅配股：要不要跳槽進科學園區？",
        "desc": "學長在竹科上班，年終分到的股票市值比年薪還高。他說公司正在擴廠，問你要不要過去，代價是常常加班到半夜。",
        "source": "1990 年代至 2007 年，科技業「員工分紅配股」以面額計算，造就大批科技新貴；2008 年起員工分紅改按市價費用化。",
        "conditions": {
          "year_range": [
            1990,
            2006
          ],
          "age_range": [
            22,
            38
          ],
          "working": true,
          "edu_min": 4,
          "sub_major_in": [
            "stem_eng"
          ],
          "careers_not_in": [
            "car_hsinchu_semi",
            "car_doctor_pharma",
            "car_lawyer_cpa",
            "car_cpa",
            "car_civil_teacher"
          ]
        },
        "chance": 0.3,
        "trait_chance": {
          "workaholic": 1.6,
          "sensitive_introvert": 0.8
        },
        "options": [
          {
            "key": "join_semi",
            "label": "跳槽進竹科，拼分紅配股",
            "auto_weight": 0.45,
            "trait_weight": {
              "workaholic": 2.0,
              "risk_taker": 1.3,
              "family_first": 0.7
            },
            "effects": {
              "assign_career": "car_hsinchu_semi",
              "wage_mult": 1.1,
              "work_hours_high": true,
              "health": -3,
              "flags": [
                "tech_bonus_era"
              ]
            },
            "text": "你搬進新竹的宿舍，識別證上印著公司的 logo，桌上多了一張行軍床。",
            "outcomes": [
              {
                "delay": [
                  1,
                  4
                ],
                "roll": {
                  "p": 0.6,
                  "stat_p": {
                    "knowledge": 0.006
                  },
                  "success": {
                    "effects": {
                      "money": 1500000,
                      "happiness": 6
                    },
                    "text": "公司股價大漲，你領到的分紅股票，抵得上好幾年薪水。"
                  },
                  "fail": {
                    "effects": {
                      "happiness": -2
                    },
                    "text": "進去沒多久遇到景氣反轉，分紅股票跌得只剩零頭。"
                  }
                }
              },
              {
                "at_year": [
                  2008,
                  2008
                ],
                "if_career": "car_hsinchu_semi",
                "success": {
                  "effects": {
                    "wage_mult": 0.92
                  },
                  "text": "2008 年員工分紅費用化上路，科技新貴的分紅大幅縮水。"
                }
              }
            ],
            "requires_stats": {
              "knowledge": 60,
              "health": 40
            }
          },
          {
            "key": "stay",
            "label": "留在原本的工作，生活比較正常",
            "auto_weight": 0.55,
            "trait_weight": {
              "family_first": 1.6,
              "sensitive_introvert": 1.4
            },
            "effects": {
              "health": 1
            },
            "text": "你婉拒了學長。幾年後看到他買了新竹的透天厝，你偶爾會想，如果當年……"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1999_crossborder_marriage",
        "era_label": "1990–2000 年代 · 跨國婚姻",
        "title": "要不要透過介紹，迎娶外籍配偶？",
        "desc": "你 {age} 歲了還沒成家，父母很著急。鄰近已經有好幾戶人家娶了越南、印尼或中國大陸的配偶，媒人說可以安排你出國相親。",
        "source": "2003 年外籍與大陸配偶占全台結婚對數約三成；2004 年出生的嬰兒，每 8 人就有 1 人的母親是新住民。",
        "conditions": {
          "year_range": [
            1995,
            2010
          ],
          "age_range": [
            32,
            50
          ],
          "sex": "M",
          "single": true,
          "never_married": true,
          "edu_max": 3,
          "quintile_range": [
            1,
            3
          ]
        },
        "chance": 0.22,
        "trait_chance": {
          "family_first": 1.5,
          "sensitive_introvert": 1.3,
          "sociable": 0.7
        },
        "options": [
          {
            "key": "marry_foreign",
            "label": "請媒人安排，出國相親結婚",
            "auto_weight": 0.4,
            "trait_weight": {
              "family_first": 1.6
            },
            "effects": {
              "money": -300000,
              "marry_foreign": true,
              "happiness": 4
            },
            "text": "語言不通的頭幾年很辛苦，但你們慢慢學會彼此的話，也學著當一家人。"
          },
          {
            "key": "stay_single",
            "label": "不想這樣結婚，順其自然",
            "auto_weight": 0.6,
            "trait_weight": {
              "sensitive_introvert": 1.3
            },
            "effects": {
              "happiness": -1
            },
            "text": "你跟父母說再等等。母親嘆了口氣，沒再多說。"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E2004_cash_card",
        "era_label": "2000 年代 · 雙卡風暴",
        "title": "現金卡廣告滿天飛：要不要辦一張周轉？",
        "desc": "電視廣告天天播，捷運站口有人在發現金卡申請書，免保人、立刻核卡。月底手頭緊，朋友說辦一張周轉一下就好。",
        "source": "2002 年起現金卡大行其道，循環利率近 20%；2005–2006 年爆發雙卡風暴，數十萬人淪為「卡奴」。",
        "conditions": {
          "year_range": [
            2002,
            2005
          ],
          "age_range": [
            20,
            35
          ],
          "working": true,
          "max_liquid_twd_2025": 400000
        },
        "chance": 0.4,
        "trait_chance": {
          "risk_taker": 1.8,
          "sociable": 1.4,
          "cautious": 0.3
        },
        "options": [
          {
            "key": "apply_spend",
            "label": "辦一張，先拿來買想要的東西",
            "auto_weight": 0.22,
            "trait_weight": {
              "risk_taker": 2.0,
              "sociable": 1.6,
              "cautious": 0.2
            },
            "effects": {
              "happiness": 5,
              "money": 120000,
              "flags": [
                "card_debt"
              ]
            },
            "text": "新手機、出國玩，刷下去的那一刻很輕鬆。",
            "outcomes": [
              {
                "at_year": [
                  2005,
                  2007
                ],
                "roll": {
                  "p": 0.4,
                  "trait_p": {
                    "cautious": 0.2,
                    "workaholic": 0.1
                  },
                  "stat_p": {
                    "knowledge": 0.005
                  },
                  "success": {
                    "effects": {
                      "money": -150000
                    },
                    "text": "你咬牙把卡債還清，從此不敢再碰現金卡。"
                  },
                  "fail": {
                    "effects": {
                      "money": -420000,
                      "heavy_debt": true,
                      "happiness": -10,
                      "health": -3
                    },
                    "text": "循環利息越滾越大，你成了新聞裡的「卡奴」，每個月薪水一半拿去還債。"
                  }
                }
              }
            ]
          },
          {
            "key": "apply_emergency",
            "label": "辦一張備用，只在急用時周轉",
            "auto_weight": 0.28,
            "trait_weight": {
              "family_first": 1.2
            },
            "roll": {
              "p": 0.8,
              "trait_p": {
                "cautious": 0.1,
                "risk_taker": -0.15
              },
              "success": {
                "effects": {},
                "text": "那張卡一直躺在皮夾裡，只用過一兩次。"
              },
              "fail": {
                "effects": {
                  "money": -100000,
                  "happiness": -4
                },
                "text": "急用一次、兩次，利息比你想的還高，花了一年才還清。"
              }
            }
          },
          {
            "key": "refuse",
            "label": "不辦，量入為出",
            "auto_weight": 0.5,
            "trait_weight": {
              "cautious": 2.5
            },
            "effects": {
              "happiness": -1
            },
            "text": "你把申請書丟進捷運站的垃圾桶。"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E2009_22k",
        "era_label": "2000 年代末 · 22K",
        "title": "22K 的畢業季：第一份工作怎麼走？",
        "desc": "金融海嘯後，企業紛紛凍結招募。政府推出大專畢業生企業實習方案，補助月薪 22K。同學有人去大陸，也有人在家準備國考。",
        "source": "2009 年教育部「大專畢業生至企業職場實習方案」補助月薪 22,000 元，此後「22K」成為低薪的代名詞。",
        "conditions": {
          "year_range": [
            2009,
            2012
          ],
          "age_range": [
            22,
            28
          ],
          "working": true,
          "edu_min": 4,
          "max_work_years": 2,
          "careers_not_in": [
            "car_civil_teacher",
            "car_doctor_pharma",
            "car_lawyer_cpa",
            "car_cpa"
          ]
        },
        "chance": 0.9,
        "options": [
          {
            "key": "accept_22k",
            "label": "先領 22K 進公司，累積經驗再說",
            "auto_weight": 0.55,
            "trait_weight": {
              "cautious": 1.3,
              "workaholic": 1.3
            },
            "effects": {
              "flags": [
                "hit_22k_anchor"
              ],
              "wage_mult": 0.96,
              "knowledge": 2,
              "happiness": -3
            },
            "text": "第一份薪水扣掉房租和勞健保，所剩無幾。你在臉書上看到「22K」又上了新聞。"
          },
          {
            "key": "go_china",
            "label": "去大陸的台資企業上班，薪水高一截",
            "auto_weight": 0.15,
            "trait_weight": {
              "risk_taker": 1.8,
              "family_first": 0.5
            },
            "effects": {
              "expat": [
                4,
                1.35
              ],
              "social": -3,
              "flags": [
                "worked_in_china"
              ]
            },
            "text": "你拖著行李到了上海，第一次發現台灣以外的世界那麼大，也那麼競爭。"
          },
          {
            "key": "civil_exam",
            "label": "辭職在家，全心準備國考",
            "auto_weight": 0.3,
            "trait_weight": {
              "cautious": 2.0,
              "risk_taker": 0.5
            },
            "effects": {
              "exam_prep_years": 1,
              "happiness": -2
            },
            "text": "你買齊了補習班的講義，每天早上七點坐到圖書館。",
            "requires_stats": {
              "knowledge": 50
            }
          }
        ],
        "tier": "era"
      },
      {
        "id": "E2012_working_holiday",
        "era_label": "2010 年代 · 打工度假",
        "title": "打工度假：要不要去澳洲存第一桶金？",
        "desc": "臉書上滿是朋友在澳洲農場、肉廠打工的照片，說一年就能存下在台灣好幾年的積蓄。你的工作看不到加薪的希望……",
        "source": "2004 年台澳打工度假簽證上路，2012–2013 年每年約 3 萬多名台灣青年前往。",
        "conditions": {
          "year_range": [
            2009,
            2019
          ],
          "age_range": [
            21,
            30
          ],
          "never_abroad": true,
          "unmarried": true,
          "no_children": true,
          "working": true,
          "careers_not_in": [
            "car_civil_teacher",
            "car_doctor_pharma"
          ]
        },
        "chance": 0.12,
        "trait_chance": {
          "risk_taker": 1.6,
          "sociable": 1.4,
          "cautious": 0.6,
          "family_first": 0.7
        },
        "options": [
          {
            "key": "go_aus",
            "label": "辭職去澳洲肉廠、農場打工",
            "auto_weight": 0.4,
            "trait_weight": {
              "risk_taker": 1.6,
              "sociable": 1.3
            },
            "effects": {
              "working_holiday": "AUS"
            },
            "text": "你在桃園機場拍了一張出境照，配上一句「出發了」。",
            "requires_stats": {
              "health": 50
            },
            "requires_able_body": true
          },
          {
            "key": "stay",
            "label": "留在台灣，繼續拼加薪",
            "auto_weight": 0.6,
            "trait_weight": {
              "cautious": 1.6,
              "family_first": 1.4
            },
            "effects": {},
            "text": "你按了一個讚，關掉臉書，繼續加班。"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E2014_sunflower",
        "era_label": "2014 · 太陽花學運",
        "title": "2014 年 3 月：立法院外的人潮",
        "desc": "服貿協議在委員會以 30 秒宣布通過，一群學生衝進立法院議場。接下來幾個星期，青島東路、濟南路上坐滿了人，網路上每天都在吵。",
        "source": "2014 年 3 月 18 日至 4 月 10 日，學生與公民團體占領立法院，反對《海峽兩岸服務貿易協議》的審查程序，服貿最終未生效。社會對此評價分歧。",
        "conditions": {
          "year_range": [
            2014,
            2014
          ],
          "age_range": [
            18,
            45
          ]
        },
        "chance": 0.35,
        "trait_chance": {
          "civic_minded": 3.0,
          "sociable": 1.3,
          "sensitive_introvert": 0.8
        },
        "options": [
          {
            "key": "join_sit_in",
            "label": "到立法院外靜坐聲援",
            "auto_weight": 0.2,
            "trait_weight": {
              "civic_minded": 3.0,
              "sociable": 1.5,
              "cautious": 0.5
            },
            "effects": {
              "social": 5,
              "happiness": 3,
              "health": -1,
              "knowledge": 2,
              "flags": [
                "civic_participant"
              ]
            },
            "text": "你在濟南路的柏油路上坐了一整晚，旁邊的陌生人分給你一瓶水。"
          },
          {
            "key": "online_follow",
            "label": "在網路上關注、轉貼，沒有到現場",
            "auto_weight": 0.4,
            "trait_weight": {
              "sensitive_introvert": 1.6
            },
            "effects": {
              "knowledge": 2
            },
            "text": "你每天睡前都在看直播，和家人在餐桌上為此吵了好幾次。"
          },
          {
            "key": "disagree",
            "label": "覺得服貿對台灣有利，不認同占領議場",
            "auto_weight": 0.2,
            "trait_weight": {
              "cautious": 1.5
            },
            "effects": {
              "knowledge": 1,
              "social": -1
            },
            "text": "你在臉書上寫了一篇反對占領的文章，底下吵了上百則留言。"
          },
          {
            "key": "ignore",
            "label": "不太關心，照常上班上課",
            "auto_weight": 0.2,
            "trait_weight": {
              "workaholic": 1.5
            },
            "effects": {},
            "text": "新聞台整天在轉播，你轉到了別的頻道。"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E2015_low_wage_exodus",
        "era_label": "2010 年代 · 低薪出走",
        "title": "低薪出走：要不要去新加坡或上海工作？",
        "desc": "你月薪約 {salary} 元，已經好幾年沒有調薪。獵頭打電話來，說新加坡和上海的公司開的薪水是台灣的將近兩倍。",
        "source": "2010 年代台灣實質薪資停滯，赴海外工作的國人一度超過 70 萬人，中國大陸、東南亞與新加坡是主要去處。",
        "conditions": {
          "year_range": [
            2012,
            2019
          ],
          "age_range": [
            25,
            40
          ],
          "working": true,
          "edu_min": 4,
          "careers_in": [
            "car_office_white_collar",
            "car_software_remote",
            "car_finance_broker",
            "car_hsinchu_semi",
            "car_export_sales",
            "car_tourism_hospitality",
            "car_cram_service_mgr"
          ]
        },
        "chance": 0.15,
        "trait_chance": {
          "risk_taker": 1.5,
          "family_first": 0.5,
          "workaholic": 1.3
        },
        "options": [
          {
            "key": "go_abroad_job",
            "label": "接下 offer，出國工作幾年",
            "auto_weight": 0.25,
            "trait_weight": {
              "risk_taker": 1.8,
              "workaholic": 1.5,
              "family_first": 0.4
            },
            "effects": {
              "expat": [
                5,
                1.7
              ],
              "social": -4,
              "happiness": 2,
              "marital_strain": 0.3
            },
            "text": "你把台灣的租屋退掉，行李箱裡塞了兩包泡麵和一罐辣椒醬。",
            "requires_stats": {
              "knowledge": 55
            }
          },
          {
            "key": "stay",
            "label": "留在台灣，離家人近一點",
            "auto_weight": 0.75,
            "trait_weight": {
              "family_first": 2.0,
              "cautious": 1.3
            },
            "effects": {
              "happiness": 1
            },
            "text": "你婉拒了獵頭，週末照常回家吃飯。"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E2023_tsmc_overseas",
        "era_label": "2020 年代 · 護國神山出海",
        "title": "護國神山出海：要不要外派到海外新廠？",
        "desc": "公司在美國亞利桑那、日本熊本和德國德勒斯登蓋新廠，急需有經驗的工程師。外派加給優渥，但要離開家人好幾年。",
        "source": "台積電 2020 年宣布赴美設廠，熊本廠 2024 年量產、德勒斯登廠 2024 年動工，外派人力與家庭安排成為熱門話題。",
        "conditions": {
          "year_range": [
            2022,
            2032
          ],
          "age_range": [
            25,
            50
          ],
          "working": true,
          "careers_in": [
            "car_hsinchu_semi"
          ]
        },
        "chance": 0.3,
        "trait_chance": {
          "workaholic": 1.4,
          "family_first": 0.6
        },
        "options": [
          {
            "key": "go_arizona",
            "label": "外派美國亞利桑那",
            "auto_weight": 0.15,
            "trait_weight": {
              "risk_taker": 1.6,
              "workaholic": 1.5,
              "family_first": 0.4
            },
            "effects": {
              "expat": [
                4,
                1.6
              ],
              "marital_strain": 0.35,
              "social": -4,
              "health": -2
            },
            "text": "你在沙漠邊的新廠宿舍裡，用視訊陪孩子寫功課。",
            "requires_stats": {
              "health": 40
            }
          },
          {
            "key": "go_kumamoto",
            "label": "外派日本熊本，離台灣近、回家方便",
            "auto_weight": 0.15,
            "trait_weight": {
              "family_first": 1.2
            },
            "effects": {
              "expat": [
                3,
                1.4
              ],
              "marital_strain": 0.2,
              "social": -2
            },
            "text": "熊本的同事很客氣，週末你常搭兩個多小時的飛機回台灣。",
            "requires_stats": {
              "health": 40
            }
          },
          {
            "key": "stay_hsinchu",
            "label": "留在竹科",
            "auto_weight": 0.7,
            "trait_weight": {
              "family_first": 2.0,
              "cautious": 1.3
            },
            "effects": {
              "happiness": 1
            },
            "text": "你把名額讓給了想出去的同事。"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E2025_ai_wave",
        "era_label": "2020 年代 · AI 浪潮",
        "title": "AI 浪潮：你的工作會被取代嗎？",
        "desc": "公司導入生成式 AI 後，一個人能做以前三個人的事。主管暗示明年要「組織精簡」，同事有人報名 AI 課程，有人開始找退路。",
        "source": "2023 年生成式 AI 普及後，文書、客服、翻譯、基礎程式與行銷等工作受到明顯衝擊。",
        "conditions": {
          "year_range": [
            2024,
            2035
          ],
          "age_range": [
            25,
            55
          ],
          "working": true,
          "careers_in": [
            "car_office_white_collar",
            "car_software_remote",
            "car_finance_broker",
            "car_creator_ecom",
            "car_cram_service_mgr",
            "car_export_sales",
            "car_cpa"
          ]
        },
        "chance": 0.2,
        "options": [
          {
            "key": "reskill_ai",
            "label": "自費上課，學會用 AI 工作",
            "auto_weight": 0.4,
            "trait_weight": {
              "workaholic": 1.6,
              "cautious": 1.1
            },
            "effects": {
              "money": -60000,
              "knowledge": 4
            },
            "roll": {
              "p": 0.5,
              "stat_p": {
                "knowledge": 0.008
              },
              "trait_p": {
                "workaholic": 0.08
              },
              "success": {
                "effects": {
                  "career_mult": 1.12,
                  "happiness": 4
                },
                "text": "你成了部門裡最會用 AI 的人，升了一級。"
              },
              "fail": {
                "effects": {
                  "happiness": -2
                },
                "text": "課上完了，部門還是縮編，你只是保住了位子。"
              }
            },
            "requires_stats": {
              "knowledge": 40
            }
          },
          {
            "key": "wait_and_see",
            "label": "先觀望，做好手上的事",
            "auto_weight": 0.4,
            "trait_weight": {
              "cautious": 1.3,
              "sensitive_introvert": 1.2
            },
            "roll": {
              "p": 0.65,
              "stat_p": {
                "knowledge": 0.004,
                "social": 0.003
              },
              "success": {
                "effects": {},
                "text": "這一波組織調整沒有輪到你。"
              },
              "fail": {
                "effects": {
                  "temp_unemployed_years": 1,
                  "career_mult": 0.9,
                  "happiness": -8
                },
                "text": "組織精簡的名單上有你的名字。"
              }
            }
          },
          {
            "key": "switch_trade",
            "label": "轉行做 AI 取代不了的技術工作",
            "auto_weight": 0.2,
            "trait_weight": {
              "risk_taker": 1.5
            },
            "effects": {
              "assign_career": "car_craft_apprentice",
              "happiness": 2,
              "health": 1
            },
            "text": "你報名了水電職訓班。師傅說：「AI 再厲害，也不會幫你換水管。」"
          }
        ],
        "tier": "era"
      },
      {
        "id": "E1996_missile_crisis",
        "tier": "era",
        "era_label": "1996 · 台海飛彈危機",
        "title": "飛彈試射：要不要把存款換成美金？",
        "desc": "第一次總統直選前，對岸在台灣外海試射飛彈。股市重挫，銀行外匯櫃台大排長龍，有人在討論移民。",
        "source": "1995–1996 年台海飛彈危機，台股一度大跌，央行進場穩定匯市；直選如期舉行，股市隨後回升。",
        "conditions": {
          "year_range": [
            1996,
            1996
          ],
          "age_range": [
            25,
            70
          ],
          "min_liquid_twd_2025": 200000
        },
        "chance": 0.45,
        "trait_chance": {
          "cautious": 1.5,
          "risk_taker": 1.3
        },
        "options": [
          {
            "key": "sell_to_usd",
            "label": "賣掉股票、把一半存款換成美金",
            "auto_weight": 0.2,
            "trait_weight": {
              "cautious": 2.2,
              "sensitive_introvert": 1.5
            },
            "effects": {
              "stock_sell_ratio": 0.6,
              "happiness": -2
            },
            "text": "你在低點賣掉了股票，換來一疊美鈔和一點安心。",
            "outcomes": [
              {
                "delay": [
                  1,
                  2
                ],
                "success": {
                  "effects": {
                    "money_liquid_ratio": -0.03
                  },
                  "text": "危機過後股市回升，當年殺在低點的股票再也買不回原價。"
                }
              }
            ]
          },
          {
            "key": "buy_dip",
            "label": "趁恐慌進場撿便宜股票",
            "auto_weight": 0.12,
            "trait_weight": {
              "risk_taker": 2.5,
              "cautious": 0.3
            },
            "effects": {
              "to_stock_ratio": 0.35
            },
            "text": "大家在賣，你在買。"
          },
          {
            "key": "stay_calm",
            "label": "照常過日子，相信會過去",
            "auto_weight": 0.68,
            "trait_weight": {
              "civic_minded": 1.4,
              "family_first": 1.2
            },
            "effects": {},
            "text": "投票那天你照常去投票所，排隊的人比想像中多。"
          }
        ]
      },
      {
        "id": "T1965_deep_sea_fishing",
        "tier": "trend",
        "era_label": "1960–80 年代 · 跑船",
        "title": "跑遠洋漁船：一趟出海就是一兩年",
        "desc": "港口的船東在招人，說上一趟遠洋漁船回來，賺的錢抵得上在陸地做好幾年。只是一出海就是一兩年，風浪也不長眼。",
        "source": "1960–80 年代台灣遠洋漁業快速擴張，大量漁工來自屏東、澎湖與東部，收入高但風險與離家代價也高。",
        "conditions": {
          "year_range": [
            1965,
            1990
          ],
          "age_range": [
            18,
            35
          ],
          "sex": "M",
          "edu_max": 2,
          "quintile_range": [
            1,
            3
          ]
        },
        "chance": 0.12,
        "trait_chance": {
          "risk_taker": 1.8,
          "family_first": 0.6
        },
        "options": [
          {
            "key": "go_sea",
            "label": "上船出海，賺一筆再回來",
            "auto_weight": 0.35,
            "trait_weight": {
              "risk_taker": 2.0,
              "workaholic": 1.4
            },
            "effects": {
              "social": -4,
              "health": -3,
              "marital_strain": 0.3
            },
            "roll": {
              "p": 0.85,
              "stat_p": {
                "health": 0.004
              },
              "success": {
                "effects": {
                  "money": 700000,
                  "happiness": 3
                },
                "text": "兩年後你曬得黝黑回到港口，存摺上的數字讓你挺直了腰。"
              },
              "fail": {
                "effects": {
                  "health": -12,
                  "money": 150000,
                  "happiness": -6
                },
                "text": "海上的一場意外讓你受了重傷，提前被送回台灣。"
              }
            },
            "requires_stats": {
              "health": 60
            },
            "requires_able_body": true
          },
          {
            "key": "stay_land",
            "label": "留在陸地，錢少一點但能回家",
            "auto_weight": 0.65,
            "trait_weight": {
              "family_first": 2.0,
              "cautious": 1.6
            },
            "effects": {},
            "text": "你目送漁船出港，回頭去工地上工。"
          }
        ]
      },
      {
        "id": "T1965_rotating_credit",
        "tier": "trend",
        "era_label": "1950–80 年代 · 標會",
        "title": "標會：要不要跟會？",
        "desc": "隔壁的阿姨在起會，每個月繳一筆，急用時可以出利息標下來。大家都是街坊鄰居，講的是信用。",
        "source": "銀行不普及的年代，民間互助會（標會）是許多家庭儲蓄與周轉的方式，但「倒會」也時有所聞。",
        "conditions": {
          "year_range": [
            1955,
            1990
          ],
          "age_range": [
            24,
            60
          ],
          "working": true,
          "quintile_range": [
            1,
            4
          ]
        },
        "chance": 0.12,
        "trait_chance": {
          "sociable": 1.5,
          "family_first": 1.3,
          "cautious": 0.8
        },
        "options": [
          {
            "key": "join_member",
            "label": "跟會當會腳，強迫自己存錢",
            "auto_weight": 0.5,
            "trait_weight": {
              "family_first": 1.4
            },
            "roll": {
              "p": 0.85,
              "stat_p": {
                "social": 0.004
              },
              "success": {
                "effects": {
                  "money": 60000,
                  "social": 2
                },
                "text": "一年下來會款順利收齊，你存下一筆錢，也多了幾個互相照應的鄰居。"
              },
              "fail": {
                "effects": {
                  "money": -120000,
                  "happiness": -6,
                  "social": -3
                },
                "text": "會頭有一天人不見了。倒會的消息傳遍整條街，你繳的錢全拿不回來。"
              }
            }
          },
          {
            "key": "be_head",
            "label": "自己起會當會頭",
            "auto_weight": 0.1,
            "trait_weight": {
              "sociable": 2.0,
              "risk_taker": 1.8
            },
            "roll": {
              "p": 0.7,
              "stat_p": {
                "social": 0.006
              },
              "success": {
                "effects": {
                  "money": 120000,
                  "social": 4
                },
                "text": "你當會頭當出了名聲，大家都說跟你的會最安心。"
              },
              "fail": {
                "effects": {
                  "money": -300000,
                  "social": -8,
                  "happiness": -8
                },
                "text": "有會腳繳不出錢跑了，你只好自掏腰包補洞。"
              }
            },
            "requires_stats": {
              "social": 60
            }
          },
          {
            "key": "no_join",
            "label": "不跟，錢放銀行比較安心",
            "auto_weight": 0.4,
            "trait_weight": {
              "cautious": 2.0,
              "sensitive_introvert": 1.3
            },
            "effects": {
              "social": -1
            },
            "text": "你婉拒了阿姨，她有點不高興。"
          }
        ]
      },
      {
        "id": "T1970_daughter_skip_uni",
        "tier": "trend",
        "era_label": "1960–80 年代 · 女孩讀那麼多做什麼",
        "title": "「女孩子念到高中就夠了」",
        "desc": "高三那年，父母說家裡還要供弟弟念大學，女孩子早點出社會，存點嫁妝，以後嫁個好人家比較實在。老師卻說，以你的成績，大學一定考得上。",
        "source": "1960–80 年代不少家庭優先讓兒子升學，女兒高中職畢業就進工廠、公司或幫忙家計。",
        "conditions": {
          "year_range": [
            1962,
            1990
          ],
          "age_range": [
            16,
            17
          ],
          "sex": "F",
          "in_secondary_school": true,
          "edu_min": 3,
          "quintile_range": [
            1,
            3
          ]
        },
        "chance": 0.5,
        "options": [
          {
            "key": "obey_work",
            "label": "聽父母的，畢業就去上班",
            "auto_weight": 0.45,
            "trait_weight": {
              "family_first": 2.0,
              "cautious": 1.3
            },
            "effects": {
              "no_uni_exam": true,
              "happiness": -3,
              "social": 2
            },
            "text": "你把大學簡章收進抽屜。畢業典禮後的第二個禮拜，你就去公司報到了。"
          },
          {
            "key": "insist_exam",
            "label": "堅持參加大學聯考",
            "auto_weight": 0.35,
            "trait_weight": {
              "civic_minded": 1.5,
              "risk_taker": 1.4,
              "workaholic": 1.4
            },
            "effects": {
              "knowledge": 3,
              "social": -2,
              "uni_admit_bonus": 0.04
            },
            "text": "你跟父親大吵一架，每天念書念到半夜。",
            "requires_stats": {
              "knowledge": 50
            }
          },
          {
            "key": "work_then_night",
            "label": "先工作，之後再念夜間部",
            "auto_weight": 0.2,
            "trait_weight": {
              "workaholic": 1.8
            },
            "effects": {
              "no_uni_exam": true,
              "flags": [
                "plans_night_uni"
              ],
              "knowledge": 1
            },
            "text": "你答應父母先去上班，但在心裡給自己訂了一個期限。",
            "outcomes": [
              {
                "delay": [
                  3,
                  6
                ],
                "roll": {
                  "p": 0.45,
                  "stat_p": {
                    "knowledge": 0.008
                  },
                  "trait_p": {
                    "workaholic": 0.15
                  },
                  "success": {
                    "effects": {
                      "unlock_night_uni": true,
                      "knowledge": 4,
                      "health": -2
                    },
                    "text": "你白天上班、晚上念夜間部，四年後拿到了大學文憑。"
                  },
                  "fail": {
                    "effects": {
                      "happiness": -2
                    },
                    "text": "工作和家事越來越多，念夜間部的計畫一年拖過一年。"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "id": "T1975_wife_quit_job",
        "tier": "trend",
        "era_label": "1960–90 年代 · 男主外女主內",
        "title": "孩子出生了：要辭職回家帶小孩嗎？",
        "desc": "孩子還小，婆家說「女人家把家顧好就好」，先生也覺得一份薪水撐得起家。公司裡，結婚生子後還留下來的女同事不多。",
        "source": "1970–90 年代，女性婚育後離開職場相當普遍；「男主外、女主內」的期待直到 2000 年代後才逐漸鬆動。",
        "conditions": {
          "year_range": [
            1960,
            2005
          ],
          "age_range": [
            22,
            40
          ],
          "sex": "F",
          "married": true,
          "working": true,
          "child_age_range": [
            0,
            3
          ]
        },
        "chance": 0.35,
        "options": [
          {
            "key": "quit_home",
            "label": "辭職回家，專心照顧家庭",
            "auto_weight": 0.5,
            "trait_weight": {
              "family_first": 2.0,
              "cautious": 1.2,
              "workaholic": 0.4
            },
            "effects": {
              "homemaker_years": 6,
              "happiness": 2,
              "social": -2
            },
            "text": "你交出了識別證，從此每天的行程是菜市場、學校和廚房。"
          },
          {
            "key": "keep_working",
            "label": "繼續上班，請長輩或保母幫忙帶",
            "auto_weight": 0.4,
            "trait_weight": {
              "workaholic": 2.0,
              "civic_minded": 1.3
            },
            "effects": {
              "money": -60000,
              "happiness": -2,
              "health": -2,
              "marital_strain": 0.2
            },
            "text": "你每天下班先去保母家接孩子，回家還要煮飯、洗衣服。"
          },
          {
            "key": "home_piecework",
            "label": "辭職，但在家接代工或做手工貼補家用",
            "auto_weight": 0.1,
            "trait_weight": {
              "family_first": 1.4
            },
            "effects": {
              "homemaker_years": 6,
              "money": 80000,
              "health": -1
            },
            "text": "孩子睡著後，你在客廳燈下趕著代工。"
          }
        ]
      },
      {
        "id": "T1975_husband_breadwinner",
        "tier": "trend",
        "era_label": "1960–90 年代 · 男主外女主內",
        "title": "「男人要讓老婆在家享福」",
        "desc": "孩子出生後，長輩說男人就該一肩扛起家計，太太在家帶小孩才像樣。太太自己也在猶豫要不要辭職。",
        "source": "1970–90 年代「男主外、女主內」的期待仍強，丈夫被要求獨力養家也是一種壓力。",
        "conditions": {
          "year_range": [
            1960,
            2005
          ],
          "age_range": [
            24,
            42
          ],
          "sex": "M",
          "married": true,
          "working": true,
          "spouse_working": true,
          "child_age_range": [
            0,
            3
          ]
        },
        "chance": 0.3,
        "options": [
          {
            "key": "wife_home",
            "label": "讓太太辭職，自己多兼一份差",
            "auto_weight": 0.5,
            "trait_weight": {
              "family_first": 1.5,
              "workaholic": 1.6
            },
            "effects": {
              "spouse_homemaker_years": 8,
              "health": -2,
              "happiness": 1
            },
            "text": "你開始週末去朋友的店裡幫忙，回家時孩子已經睡了。"
          },
          {
            "key": "both_work",
            "label": "兩個人都繼續工作，請保母幫忙",
            "auto_weight": 0.5,
            "trait_weight": {
              "civic_minded": 1.4,
              "cautious": 1.2
            },
            "effects": {
              "money": -60000,
              "social": -1
            },
            "text": "長輩唸了幾句，你們還是決定兩個人一起扛。"
          }
        ]
      },
      {
        "id": "T1980_live_with_inlaws",
        "tier": "trend",
        "era_label": "1960–2000 年代 · 三代同堂",
        "title": "婚後要跟父母同住嗎？",
        "desc": "結婚後，長輩理所當然地以為你們會搬回家住，三代同堂互相照應。但另一半私下說，想要一個自己的小家庭。",
        "source": "1980 年代三代同堂仍相當普遍，之後核心家庭比例快速上升。",
        "conditions": {
          "year_range": [
            1960,
            2005
          ],
          "age_range": [
            22,
            40
          ],
          "married": true,
          "lives_with_parents": true
        },
        "chance": 0.2,
        "options": [
          {
            "key": "stay_together",
            "label": "三代同堂，省房租也互相照應",
            "auto_weight": 0.55,
            "trait_weight": {
              "family_first": 2.0,
              "cautious": 1.3
            },
            "effects": {
              "social": 3,
              "happiness": -2,
              "savings_rate_bonus": 0.05,
              "marital_strain": 0.15
            },
            "text": "家裡多了碗筷，也多了摩擦，但孩子放學有阿公阿嬤顧。"
          },
          {
            "key": "move_out",
            "label": "搬出去自己租房子",
            "auto_weight": 0.3,
            "trait_weight": {
              "risk_taker": 1.4,
              "sensitive_introvert": 1.5
            },
            "effects": {
              "moved_out": true,
              "happiness": 3,
              "social": -1,
              "money": -40000
            },
            "text": "搬家那天母親沒有說話，只是塞給你們一大袋自己醃的菜。"
          }
        ]
      },
      {
        "id": "T1985_son_pressure",
        "tier": "trend",
        "era_label": "1960–2000 年代 · 傳宗接代",
        "title": "「要生個兒子才能傳香火」",
        "desc": "過年回家，長輩又在飯桌上提起：「什麼時候再拚一個男孩？」親戚家已經生了第四胎，就是為了一個兒子。",
        "source": "台灣出生性別比在 1980–2000 年代明顯偏高，反映重男輕女的生育壓力。",
        "conditions": {
          "year_range": [
            1965,
            2005
          ],
          "age_range": [
            25,
            42
          ],
          "married": true,
          "children_min": 1,
          "children_max": 2
        },
        "chance": 0.25,
        "options": [
          {
            "key": "try_again",
            "label": "順著長輩，再拚一胎",
            "auto_weight": 0.45,
            "trait_weight": {
              "family_first": 2.0
            },
            "effects": {
              "desired_kids_delta": 1,
              "social": 2,
              "happiness": -1
            },
            "text": "你們又開始計畫下一胎。"
          },
          {
            "key": "push_back",
            "label": "頂住壓力：女兒也是傳家",
            "auto_weight": 0.55,
            "trait_weight": {
              "civic_minded": 1.8,
              "sensitive_introvert": 1.3
            },
            "effects": {
              "social": -2,
              "happiness": 2,
              "no_more_kids": true
            },
            "text": "你在飯桌上放下筷子：「我們家就這樣，很好。」"
          }
        ]
      },
      {
        "id": "T1985_civil_service_rice_bowl",
        "tier": "trend",
        "era_label": "1970–90 年代 · 鐵飯碗",
        "title": "要不要辭職考公務員？",
        "desc": "父母一直勸你考普考：「吃公家飯，穩定又有退休俸。」民間公司薪水比較高，但說倒就倒。",
        "source": "1970–90 年代公教人員退休金優渥，「鐵飯碗」是許多父母心中的首選。",
        "conditions": {
          "year_range": [
            1972,
            2000
          ],
          "age_range": [
            22,
            32
          ],
          "working": true,
          "edu_min": 3,
          "careers_not_in": [
            "car_civil_teacher",
            "car_doctor_pharma",
            "car_lawyer_cpa",
            "car_cpa"
          ]
        },
        "chance": 0.1,
        "trait_chance": {
          "cautious": 1.8,
          "risk_taker": 0.5
        },
        "options": [
          {
            "key": "quit_for_exam",
            "label": "辭職全心準備高普考",
            "auto_weight": 0.35,
            "trait_weight": {
              "cautious": 2.0,
              "family_first": 1.4
            },
            "effects": {
              "exam_prep_years": 1,
              "happiness": -2
            },
            "text": "你搬回家住，每天去圖書館報到。",
            "requires_stats": {
              "knowledge": 50
            }
          },
          {
            "key": "stay_private",
            "label": "留在民間，薪水和機會比較多",
            "auto_weight": 0.65,
            "trait_weight": {
              "risk_taker": 1.8,
              "workaholic": 1.4
            },
            "effects": {
              "social": -1
            },
            "text": "母親嘆了口氣：「你以後就知道。」"
          }
        ]
      },
      {
        "id": "T2005_online_shop",
        "tier": "trend",
        "era_label": "2000 年代 · 網拍創業",
        "title": "下班開網拍：要不要試試看？",
        "desc": "同事在網拍賣衣服，一個月多賺好幾萬。進貨、拍照、出貨都在晚上，聽起來不難。",
        "source": "2000 年代拍賣網站興起，下班兼職開網拍成為一波副業風潮。",
        "conditions": {
          "year_range": [
            2003,
            2014
          ],
          "age_range": [
            20,
            40
          ],
          "working": true
        },
        "chance": 0.08,
        "trait_chance": {
          "risk_taker": 1.6,
          "workaholic": 1.5,
          "sensitive_introvert": 0.8
        },
        "options": [
          {
            "key": "open_shop",
            "label": "開一家網拍小店試試",
            "auto_weight": 0.4,
            "trait_weight": {
              "workaholic": 1.8,
              "risk_taker": 1.5
            },
            "effects": {
              "money": -50000,
              "health": -2
            },
            "roll": {
              "p": 0.4,
              "stat_p": {
                "knowledge": 0.004,
                "social": 0.004
              },
              "success": {
                "effects": {
                  "money": 300000,
                  "happiness": 5
                },
                "text": "你的小店累積了好評，副業收入快追上正職。"
              },
              "fail": {
                "effects": {
                  "money": -60000,
                  "happiness": -3
                },
                "text": "庫存堆滿了房間，半年後你默默關了賣場。"
              }
            }
          },
          {
            "key": "no_shop",
            "label": "算了，下班想好好休息",
            "auto_weight": 0.6,
            "trait_weight": {
              "cautious": 1.5,
              "family_first": 1.3
            },
            "effects": {
              "happiness": 1
            },
            "text": "你按掉同事傳來的連結。"
          }
        ]
      },
      {
        "id": "T2010_overtime_culture",
        "tier": "trend",
        "era_label": "2000 年代以後 · 責任制",
        "title": "責任制：今晚又要加班嗎？",
        "desc": "主管說專案趕上線，「責任制」沒有加班費。同事們都還在座位上，你看了一眼時鐘，已經九點了。",
        "source": "台灣長年名列全球工時最長的國家之一；2016 年一例一休修法後，加班與過勞仍是熱門議題。",
        "conditions": {
          "year_range": [
            2000,
            2028
          ],
          "age_range": [
            24,
            45
          ],
          "working": true,
          "careers_in": [
            "car_office_white_collar",
            "car_software_remote",
            "car_finance_broker",
            "car_hsinchu_semi",
            "car_export_sales",
            "car_cpa",
            "car_lawyer_cpa",
            "car_cram_service_mgr"
          ]
        },
        "chance": 0.12,
        "options": [
          {
            "key": "grind",
            "label": "拚了，做到專案上線",
            "auto_weight": 0.4,
            "trait_weight": {
              "workaholic": 2.5,
              "sensitive_introvert": 0.8
            },
            "effects": {
              "health": -4,
              "work_hours_high": true
            },
            "roll": {
              "p": 0.5,
              "stat_p": {
                "knowledge": 0.005
              },
              "success": {
                "effects": {
                  "career_mult": 1.06,
                  "happiness": 2
                },
                "text": "專案順利上線，你在年底拿到了調薪。"
              },
              "fail": {
                "effects": {
                  "happiness": -4
                },
                "text": "加了半年的班，功勞最後掛在別人名下。"
              }
            },
            "requires_stats": {
              "health": 40
            }
          },
          {
            "key": "clock_out",
            "label": "準時下班，工作是為了生活",
            "auto_weight": 0.4,
            "trait_weight": {
              "family_first": 1.8,
              "sociable": 1.4
            },
            "effects": {
              "happiness": 3,
              "health": 2
            },
            "text": "你關上電腦，在主管的目光裡走出辦公室。"
          },
          {
            "key": "change_company",
            "label": "換到一家不加班的公司，薪水少一點",
            "auto_weight": 0.2,
            "trait_weight": {
              "cautious": 1.3,
              "sensitive_introvert": 1.5
            },
            "effects": {
              "career_mult": 0.95,
              "happiness": 4,
              "health": 2
            },
            "text": "新公司六點就沒人了，你第一次在天黑前回到家。"
          }
        ]
      },
      {
        "id": "T2018_side_hustle",
        "tier": "trend",
        "era_label": "2010–2030 年代 · 斜槓",
        "title": "薪水不夠用：下班要不要兼外送？",
        "desc": "房租、孝親費、信用卡帳單，月底總是不夠。朋友說下班跑外送，一個月能多兩三萬。",
        "source": "2016 年後外送平台與零工經濟興起，下班兼差的「斜槓」成為不少上班族的日常。",
        "conditions": {
          "year_range": [
            2016,
            2035
          ],
          "age_range": [
            22,
            45
          ],
          "working": true,
          "low_income": true
        },
        "chance": 0.15,
        "trait_chance": {
          "workaholic": 1.6,
          "risk_taker": 1.2
        },
        "options": [
          {
            "key": "deliver",
            "label": "下班跑外送",
            "auto_weight": 0.45,
            "trait_weight": {
              "workaholic": 2.0,
              "family_first": 1.3
            },
            "effects": {
              "money": 200000,
              "health": -4,
              "social": -2
            },
            "roll": {
              "p": 0.9,
              "stat_p": {
                "health": 0.003
              },
              "success": {
                "effects": {},
                "text": "你熟悉了城市每一條巷子，存款也慢慢多了起來。"
              },
              "fail": {
                "effects": {
                  "health": -8,
                  "money": -50000
                },
                "text": "一個下雨的晚上，你在路口摔車，休養了好幾個月。"
              }
            },
            "requires_stats": {
              "health": 45
            },
            "requires_able_body": true
          },
          {
            "key": "learn_skill",
            "label": "把時間拿去進修，換更好的工作",
            "auto_weight": 0.3,
            "trait_weight": {
              "cautious": 1.4,
              "sensitive_introvert": 1.3
            },
            "effects": {
              "money": -40000,
              "knowledge": 4
            },
            "roll": {
              "p": 0.45,
              "stat_p": {
                "knowledge": 0.008
              },
              "success": {
                "effects": {
                  "career_mult": 1.1
                },
                "text": "你考到了證照，換到薪水高一截的工作。"
              },
              "fail": {
                "effects": {},
                "text": "課上完了，薪水還是沒動。"
              }
            },
            "requires_stats": {
              "knowledge": 45
            }
          },
          {
            "key": "cut_spending",
            "label": "縮衣節食就好",
            "auto_weight": 0.25,
            "trait_weight": {
              "cautious": 1.6
            },
            "effects": {
              "happiness": -3,
              "savings_rate_bonus": 0.05
            },
            "text": "你開始自己帶便當，取消了串流訂閱。"
          }
        ]
      },
      {
        "id": "T2020_etf_or_house",
        "tier": "trend",
        "era_label": "2020 年代 · 存股與買房",
        "title": "房價高不可攀：存股、存頭期款，還是享受當下？",
        "desc": "房價所得比創新高，身邊的人分成三派：存高股息 ETF 的、咬牙存頭期款的，和乾脆把錢花在生活上的。",
        "source": "2020 年代台灣 ETF 受益人數倍增，同時雙北房價所得比長期超過 15 倍。",
        "conditions": {
          "year_range": [
            2019,
            2035
          ],
          "age_range": [
            24,
            40
          ],
          "working": true,
          "not_homeowner": true,
          "min_liquid_twd_2025": 100000
        },
        "chance": 0.15,
        "options": [
          {
            "key": "etf",
            "label": "定期定額存 ETF",
            "auto_weight": 0.4,
            "trait_weight": {
              "cautious": 1.3,
              "workaholic": 1.2
            },
            "effects": {
              "to_stock_ratio": 0.4,
              "savings_rate_bonus": 0.04
            },
            "text": "你設定好每月扣款，打開 App 看帳戶成了每天的儀式。"
          },
          {
            "key": "save_downpayment",
            "label": "全力存頭期款",
            "auto_weight": 0.35,
            "trait_weight": {
              "family_first": 1.8,
              "cautious": 1.4
            },
            "effects": {
              "savings_rate_bonus": 0.08,
              "happiness": -3
            },
            "text": "你把每一筆支出都記在帳本上。"
          },
          {
            "key": "enjoy_now",
            "label": "買不起就不買，把錢花在生活上",
            "auto_weight": 0.25,
            "trait_weight": {
              "sociable": 2.0,
              "risk_taker": 1.3
            },
            "effects": {
              "money": -100000,
              "happiness": 6
            },
            "text": "你訂了機票，第一次一個人出國旅行。"
          }
        ]
      },
      {
        "id": "T2024_egg_freezing",
        "tier": "trend",
        "era_label": "2020 年代 · 晚婚與凍卵",
        "title": "要不要先凍卵？",
        "desc": "你 {age} 歲了，工作正忙，身邊還沒有對的人。婦產科醫師說，如果之後想生，可以考慮先凍卵。",
        "source": "台灣女性平均初婚年齡已超過 30 歲，凍卵諮詢與療程近年大幅增加。",
        "conditions": {
          "year_range": [
            2015,
            2060
          ],
          "age_range": [
            30,
            38
          ],
          "sex": "F",
          "single": true,
          "never_married": true,
          "min_liquid_twd_2025": 150000
        },
        "chance": 0.2,
        "trait_chance": {
          "cautious": 1.4
        },
        "options": [
          {
            "key": "freeze",
            "label": "凍卵，給未來的自己多一個選擇",
            "auto_weight": 0.4,
            "trait_weight": {
              "cautious": 1.8,
              "family_first": 1.4
            },
            "effects": {
              "money": -120000,
              "flags": [
                "frozen_eggs"
              ],
              "happiness": 2
            },
            "text": "療程結束那天，你覺得肩上輕了一點。"
          },
          {
            "key": "let_be",
            "label": "順其自然",
            "auto_weight": 0.6,
            "trait_weight": {
              "risk_taker": 1.3
            },
            "effects": {},
            "text": "你把醫師給的衛教單折起來收進包包。"
          }
        ]
      },
      {
        "id": "T1995_grandparenting",
        "tier": "trend",
        "era_label": "1990 年代以後 · 隔代教養",
        "title": "兒女想請你幫忙帶孫子",
        "desc": "孩子夫妻倆都要上班，托嬰又貴又難排。他們吞吞吐吐地問，能不能把孫子白天交給你帶。",
        "source": "台灣三歲以下幼兒約有兩到三成由祖父母照顧，「阿公阿嬤帶大」是許多雙薪家庭的日常。",
        "conditions": {
          "year_range": [
            1990,
            2070
          ],
          "age_range": [
            52,
            74
          ],
          "children_min": 1,
          "child_age_range": [
            26,
            42
          ]
        },
        "chance": 0.06,
        "options": [
          {
            "key": "help",
            "label": "答應，每天幫忙帶孫",
            "auto_weight": 0.6,
            "trait_weight": {
              "family_first": 2.2,
              "workaholic": 0.6
            },
            "effects": {
              "happiness": 4,
              "social": 3,
              "health": -2
            },
            "text": "你的生活又被尿布和奶瓶填滿，但孫子第一次叫你的時候，一切都值得了。"
          },
          {
            "key": "decline",
            "label": "婉拒，想過自己的退休生活",
            "auto_weight": 0.4,
            "trait_weight": {
              "sociable": 1.6,
              "risk_taker": 1.3
            },
            "effects": {
              "happiness": 2,
              "social": -2
            },
            "text": "你報名了社區大學的書法班，跟老朋友約好下個月去旅行。"
          }
        ]
      },
      {
        "id": "F2028_four_day_week",
        "tier": "future",
        "era_label": "2030 年代 · 週休三日",
        "title": "多出來的星期五要做什麼？",
        "desc": "公司跟著 AI 代理試辦週休三日，你突然多了一天。有人拿來進修，有人兼第二份工作，也有人終於能陪家人。",
        "source": "虛構推演：延續「AI 代理進駐辦公室」的世界線。",
        "conditions": {
          "year_range": [
            2028,
            2045
          ],
          "age_range": [
            24,
            60
          ],
          "working": true,
          "careers_in": [
            "car_office_white_collar",
            "car_software_remote",
            "car_finance_broker",
            "car_hsinchu_semi",
            "car_export_sales",
            "car_cpa",
            "car_lawyer_cpa",
            "car_cram_service_mgr"
          ],
          "future_events_any": [
            "FF_2027_ai_white_collar_4day"
          ]
        },
        "chance": 0.5,
        "options": [
          {
            "key": "study",
            "label": "拿來進修新技能",
            "auto_weight": 0.35,
            "trait_weight": {
              "workaholic": 1.6,
              "cautious": 1.3
            },
            "effects": {
              "knowledge": 5,
              "money": -30000
            },
            "roll": {
              "p": 0.5,
              "stat_p": {
                "knowledge": 0.006
              },
              "success": {
                "effects": {
                  "career_mult": 1.08
                },
                "text": "兩年後，你成了公司裡少數能和 AI 一起設計流程的人。"
              },
              "fail": {
                "effects": {},
                "text": "學了不少東西，薪水倒是沒什麼變化。"
              },
              "world_p": {
                "ai": {
                  "fast": 0.1,
                  "slow": -0.1
                }
              }
            },
            "requires_stats": {
              "knowledge": 40
            }
          },
          {
            "key": "second_job",
            "label": "兼第二份工作",
            "auto_weight": 0.25,
            "trait_weight": {
              "workaholic": 2.0,
              "risk_taker": 1.3
            },
            "effects": {
              "money": 250000,
              "health": -4
            },
            "text": "你的星期五變成了另一個星期一。",
            "roll": {
              "p": 0.7,
              "stat_p": {
                "health": 0.005
              },
              "world_p": {
                "economy": {
                  "boom": 0.15,
                  "crisis": -0.2
                }
              },
              "success": {
                "effects": {},
                "text": "第二份工作做出了口碑，你考慮把它變成正職。"
              },
              "fail": {
                "effects": {
                  "health": -4,
                  "money": -80000
                },
                "text": "兼差的公司突然倒了，最後一個月的錢沒拿到，身體也累垮了。"
              }
            },
            "requires_stats": {
              "health": 45
            }
          },
          {
            "key": "family_time",
            "label": "留給家人和自己",
            "auto_weight": 0.4,
            "trait_weight": {
              "family_first": 2.0,
              "sociable": 1.5
            },
            "effects": {
              "happiness": 6,
              "social": 4,
              "health": 2
            },
            "text": "你開始每週五去爬山，傍晚去接孩子放學。"
          }
        ]
      },
      {
        "id": "F2030_heat_outdoor_work",
        "tier": "future",
        "era_label": "2030 年代 · 40°C 新常態",
        "title": "夏天越來越熱：還要繼續在戶外工作嗎？",
        "desc": "今年夏天又有好幾天超過 40°C，同行有人中暑送醫。朋友介紹了一份室內的工作，薪水少一些。",
        "source": "虛構推演：延續極端高溫常態化的世界線。",
        "conditions": {
          "year_range": [
            2028,
            2060
          ],
          "age_range": [
            25,
            62
          ],
          "working": true,
          "careers_in": [
            "car_gig_delivery",
            "car_driver_logistics",
            "car_craft_apprentice",
            "car_farmer_fisher",
            "car_service_worker"
          ],
          "future_events_any": [
            "FF_2028_heatwave_law"
          ]
        },
        "chance": 0.4,
        "options": [
          {
            "key": "move_indoor",
            "label": "換到室內工作",
            "auto_weight": 0.4,
            "trait_weight": {
              "cautious": 1.8,
              "family_first": 1.3
            },
            "effects": {
              "career_mult": 0.92,
              "health": 3
            },
            "text": "冷氣房裡的工作很單調，但你不用再擔心中暑。",
            "roll": {
              "p": 0.6,
              "world_p": {
                "economy": {
                  "boom": 0.2,
                  "crisis": -0.2
                }
              },
              "success": {
                "effects": {},
                "text": "新工作上手得很快，主管說你比坐辦公室長大的人更能吃苦。"
              },
              "fail": {
                "effects": {
                  "career_mult": 0.95,
                  "happiness": -3
                },
                "text": "室內工作缺額少，你只能從最基層做起。"
              }
            }
          },
          {
            "key": "keep_outdoor",
            "label": "繼續做，避開最熱的時段",
            "auto_weight": 0.6,
            "trait_weight": {
              "workaholic": 1.6,
              "risk_taker": 1.4
            },
            "roll": {
              "p": 0.8,
              "stat_p": {
                "health": 0.005
              },
              "success": {
                "effects": {
                  "health": -2
                },
                "text": "你清晨四點出門，正午就收工。"
              },
              "fail": {
                "effects": {
                  "health": -10,
                  "temp_unemployed_years": 1
                },
                "text": "一個午後你在工作中熱衰竭倒下，休養了大半年。"
              },
              "world_p": {
                "climate": {
                  "harsh": -0.15
                }
              }
            },
            "requires_stats": {
              "health": 45
            },
            "requires_able_body": true
          }
        ]
      },
      {
        "id": "F2030_social_housing",
        "tier": "future",
        "era_label": "2030 年代 · 社宅 50 萬戶",
        "title": "社會住宅抽中了：要搬進去嗎？",
        "desc": "你抽中了離公司不遠的社會住宅，租金比市價便宜三成，但只能住到一定年限，也不能自己裝潢。",
        "source": "虛構推演：延續「社宅＋包租代管 50 萬戶」的世界線。",
        "conditions": {
          "year_range": [
            2029,
            2060
          ],
          "age_range": [
            23,
            45
          ],
          "not_homeowner": true,
          "future_events_any": [
            "FF_2029_social_housing_500k"
          ]
        },
        "chance": 0.35,
        "options": [
          {
            "key": "move_in",
            "label": "搬進社宅，把省下的房租存起來",
            "auto_weight": 0.6,
            "trait_weight": {
              "cautious": 1.6,
              "family_first": 1.3
            },
            "effects": {
              "savings_rate_bonus": 0.06,
              "happiness": 3
            },
            "text": "新家有電梯和公共客廳，鄰居多是跟你一樣的年輕人。",
            "roll": {
              "p": 0.75,
              "stat_p": {
                "social": 0.004
              },
              "success": {
                "effects": {
                  "social": 2
                },
                "text": "社宅的共同廚房讓你認識了一群好鄰居。"
              },
              "fail": {
                "effects": {
                  "happiness": -3
                },
                "text": "隔音很差，樓上的鄰居每天半夜拖椅子，你開始想念以前的套房。"
              }
            }
          },
          {
            "key": "keep_saving_buy",
            "label": "放棄，繼續存錢準備買房",
            "auto_weight": 0.4,
            "trait_weight": {
              "risk_taker": 1.3
            },
            "effects": {
              "happiness": -1
            },
            "text": "你把名額讓給了候補的人。"
          }
        ]
      },
      {
        "id": "F2032_industry_pivot",
        "tier": "future",
        "era_label": "2030 年代 · 晶圓去中心化",
        "title": "產業二次轉型：要不要從半導體跳到生醫或綠能？",
        "desc": "晶圓廠一座座蓋到海外，公司開始縮減台灣的新增職缺。生醫和綠能新創正在搶有製程經驗的工程師。",
        "source": "虛構推演：延續「全球晶圓製造去中心化」的世界線。",
        "conditions": {
          "year_range": [
            2031,
            2050
          ],
          "age_range": [
            25,
            55
          ],
          "working": true,
          "careers_in": [
            "car_hsinchu_semi"
          ],
          "future_events_any": [
            "FF_2031_semi_decentralize"
          ]
        },
        "chance": 0.45,
        "options": [
          {
            "key": "pivot",
            "label": "跳槽到生醫或綠能新創",
            "auto_weight": 0.35,
            "trait_weight": {
              "risk_taker": 2.0,
              "civic_minded": 1.3
            },
            "roll": {
              "p": 0.5,
              "stat_p": {
                "knowledge": 0.006
              },
              "success": {
                "effects": {
                  "career_mult": 1.15,
                  "happiness": 5
                },
                "text": "新創拿到國際大單，你手上的認股權開始值錢了。"
              },
              "fail": {
                "effects": {
                  "career_mult": 0.85,
                  "happiness": -4
                },
                "text": "新創燒完資金收了，你只好回到傳統製造業。"
              },
              "world_p": {
                "economy": {
                  "boom": 0.15,
                  "crisis": -0.2
                }
              }
            }
          },
          {
            "key": "stay_fab",
            "label": "留在原公司，爭取海外職位",
            "auto_weight": 0.65,
            "trait_weight": {
              "cautious": 1.8,
              "workaholic": 1.3
            },
            "effects": {
              "expat": [
                3,
                1.4
              ],
              "social": -2,
              "marital_strain": 0.2
            },
            "text": "你接下了海外廠的職缺，又開始跟家人視訊。",
            "roll": {
              "p": 0.6,
              "world_p": {
                "geo": {
                  "calm": 0.15,
                  "tense": -0.2
                }
              },
              "success": {
                "effects": {
                  "career_mult": 1.05
                },
                "text": "海外廠站穩了腳步，你升上了廠務主管。"
              },
              "fail": {
                "effects": {
                  "happiness": -4
                },
                "text": "海外廠的政策一變再變，你被調回台灣，職位反而降了一級。"
              }
            }
          }
        ]
      },
      {
        "id": "F2033_cancer_vaccine_screen",
        "tier": "future",
        "era_label": "2030 年代 · 精準醫療",
        "title": "要不要做全套基因檢測與預防性療程？",
        "desc": "個人化 mRNA 癌症疫苗納入健保後，醫院推出自費的全基因定序和預防方案，價格不便宜，但能提早知道風險。",
        "source": "虛構推演：延續「個人化 mRNA 癌症疫苗納入健保」的世界線。",
        "conditions": {
          "year_range": [
            2032,
            2070
          ],
          "age_range": [
            40,
            70
          ],
          "future_events_any": [
            "FF_2032_mrna_cancer_nhi"
          ],
          "min_liquid_twd_2025": 150000
        },
        "chance": 0.3,
        "options": [
          {
            "key": "screen",
            "label": "自費做全套檢測",
            "auto_weight": 0.45,
            "trait_weight": {
              "cautious": 2.0,
              "sensitive_introvert": 1.3
            },
            "effects": {
              "money": -150000,
              "health": 4,
              "mortality_mult": 0.92
            },
            "text": "報告厚厚一本，醫師幫你排了幾項預防療程。",
            "roll": {
              "p": 0.6,
              "world_p": {
                "ai": {
                  "fast": 0.2,
                  "slow": -0.15
                }
              },
              "success": {
                "effects": {
                  "health": 3
                },
                "text": "檢測及早發現了一個小問題，處理得很順利。"
              },
              "fail": {
                "effects": {
                  "happiness": -2
                },
                "text": "報告上一堆「風險偏高」讓你焦慮了好幾個月，最後證明是虛驚一場。"
              }
            }
          },
          {
            "key": "skip",
            "label": "健保有的就夠了",
            "auto_weight": 0.55,
            "trait_weight": {
              "risk_taker": 1.5
            },
            "effects": {},
            "text": "你把傳單丟進了回收桶。"
          }
        ]
      },
      {
        "id": "F2036_work_to_70",
        "tier": "future",
        "era_label": "2030 年代 · 延退至 70 歲",
        "title": "延退至 70 歲：要再做幾年嗎？",
        "desc": "勞保改革通過，可以選擇延後到 70 歲退休，年金也會多一些。公司說你的經驗還用得到。",
        "source": "虛構推演：延續「彈性延退至 70 歲」的世界線。",
        "conditions": {
          "year_range": [
            2034,
            2070
          ],
          "age_range": [
            60,
            66
          ],
          "working": true,
          "future_events_any": [
            "FF_2035_retire_70_reform"
          ]
        },
        "chance": 0.5,
        "options": [
          {
            "key": "extend",
            "label": "延後退休，多做幾年",
            "auto_weight": 0.45,
            "trait_weight": {
              "workaholic": 2.2,
              "cautious": 1.3
            },
            "effects": {
              "flags": [
                "extended_work_70"
              ],
              "social": 2,
              "health": -1
            },
            "text": "你把退休歡送會的日期往後挪了幾年。",
            "roll": {
              "p": 0.7,
              "stat_p": {
                "health": 0.006
              },
              "success": {
                "effects": {
                  "money": 300000,
                  "happiness": 2
                },
                "text": "多做的幾年讓退休金多了一截，你也還沒準備好閒下來。"
              },
              "fail": {
                "effects": {
                  "health": -6,
                  "happiness": -3
                },
                "text": "身體跟不上工作量，你在一次健檢後被醫師勸退。"
              }
            },
            "requires_stats": {
              "health": 45
            }
          },
          {
            "key": "retire_on_time",
            "label": "照原計畫退休",
            "auto_weight": 0.55,
            "trait_weight": {
              "family_first": 1.6,
              "sociable": 1.5
            },
            "effects": {
              "happiness": 2
            },
            "text": "你開始規劃退休後第一趟長途旅行。",
            "roll": {
              "p": 0.65,
              "world_p": {
                "economy": {
                  "boom": 0.15,
                  "stagnant": -0.1,
                  "crisis": -0.25
                }
              },
              "success": {
                "effects": {
                  "happiness": 2
                },
                "text": "退休金夠用，你的退休生活過得比預期寬裕。"
              },
              "fail": {
                "effects": {
                  "happiness": -4,
                  "savings_rate_bonus": 0.05
                },
                "text": "物價漲得比退休金快，你開始精打細算每一筆開銷。"
              }
            }
          }
        ]
      },
      {
        "id": "F2040_ubi_retrain",
        "tier": "future",
        "era_label": "2040 年代 · 轉型津貼",
        "title": "領轉型津貼，回學校重新來過？",
        "desc": "政府用算力稅發放「全民基本轉型津貼」，申請者可以帶薪離職一年重新學習。你的工作正一點一點被自動化取代。",
        "source": "虛構推演：延續「自動化算力稅與全民基本轉型津貼」的世界線。",
        "conditions": {
          "year_range": [
            2038,
            2070
          ],
          "age_range": [
            25,
            58
          ],
          "working": true,
          "future_events_any": [
            "FF_2039_ai_tax_ubi_pilot"
          ]
        },
        "chance": 0.35,
        "options": [
          {
            "key": "retrain",
            "label": "申請津貼，花一年轉換跑道",
            "auto_weight": 0.4,
            "trait_weight": {
              "risk_taker": 1.6,
              "workaholic": 1.2,
              "civic_minded": 1.3
            },
            "effects": {
              "temp_unemployed_years": 1,
              "knowledge": 6,
              "happiness": 3
            },
            "roll": {
              "p": 0.55,
              "stat_p": {
                "knowledge": 0.006
              },
              "success": {
                "effects": {
                  "career_mult": 1.1
                },
                "text": "一年後你帶著新的證照回到職場，起薪比原本還高。"
              },
              "fail": {
                "effects": {
                  "career_mult": 0.95
                },
                "text": "新領域比想像中難擠進去，你最後回到原本的行業。"
              },
              "world_p": {
                "economy": {
                  "boom": 0.1,
                  "crisis": -0.15
                }
              }
            },
            "requires_stats": {
              "knowledge": 45
            }
          },
          {
            "key": "stay",
            "label": "先保住現在的工作",
            "auto_weight": 0.6,
            "trait_weight": {
              "cautious": 1.8,
              "family_first": 1.4
            },
            "effects": {},
            "text": "你決定再撐幾年看看。",
            "roll": {
              "p": 0.6,
              "world_p": {
                "ai": {
                  "fast": -0.2,
                  "slow": 0.15
                }
              },
              "success": {
                "effects": {},
                "text": "你的工作撐過了這一波自動化。"
              },
              "fail": {
                "effects": {
                  "temp_unemployed_years": 1,
                  "career_mult": 0.9,
                  "happiness": -6
                },
                "text": "一年後部門整個被系統取代，你錯過了津貼的申請期限。"
              }
            }
          }
        ]
      },
      {
        "id": "F2042_culture_export",
        "tier": "future",
        "era_label": "2040 年代 · 台流出海",
        "title": "台流內容當紅：要不要投入遊戲或影視業？",
        "desc": "台灣的遊戲和影集在海外爆紅，製作公司到處挖人，薪水不穩但機會很多。",
        "source": "虛構推演：延續「台流內容與沉浸式華語文化出海潮」的世界線。",
        "conditions": {
          "year_range": [
            2040,
            2060
          ],
          "age_range": [
            20,
            40
          ],
          "working": true,
          "future_events_any": [
            "FF_2041_culture_wave_export"
          ],
          "careers_not_in": [
            "car_creator_ecom",
            "car_doctor_pharma",
            "car_civil_teacher"
          ]
        },
        "chance": 0.3,
        "trait_chance": {
          "sociable": 1.5,
          "risk_taker": 1.4
        },
        "options": [
          {
            "key": "jump_in",
            "label": "轉行進內容產業",
            "auto_weight": 0.3,
            "trait_weight": {
              "risk_taker": 1.8,
              "sociable": 1.6
            },
            "effects": {
              "assign_career": "car_creator_ecom"
            },
            "roll": {
              "p": 0.4,
              "stat_p": {
                "social": 0.005,
                "knowledge": 0.004
              },
              "success": {
                "effects": {
                  "career_mult": 1.25,
                  "happiness": 8
                },
                "text": "你參與的作品在海外拿了獎，片尾名單上有你的名字。"
              },
              "fail": {
                "effects": {
                  "career_mult": 0.85,
                  "happiness": -2
                },
                "text": "案子有一搭沒一搭，收入起伏很大。"
              },
              "world_p": {
                "economy": {
                  "boom": 0.15,
                  "crisis": -0.15
                },
                "geo": {
                  "calm": 0.05
                }
              }
            },
            "requires_stats": {
              "social": 50
            }
          },
          {
            "key": "watch",
            "label": "當觀眾就好",
            "auto_weight": 0.7,
            "trait_weight": {
              "cautious": 1.6
            },
            "effects": {
              "happiness": 1
            },
            "text": "你追完了那部爆紅的影集，跟朋友在群組裡討論結局。"
          }
        ]
      },
      {
        "id": "F2050_remote_return_home",
        "tier": "future",
        "era_label": "2050 年代 · 北漂時代終結",
        "title": "全息遠距普及：要搬回家鄉嗎？",
        "desc": "全息協作普及後，公司允許全遠距，而且跨縣市同酬。你在外地住了這麼多年，老家的房子比這裡大三倍。",
        "source": "虛構推演：延續「全息協作與空間運算普及」的世界線。",
        "conditions": {
          "year_range": [
            2052,
            2080
          ],
          "age_range": [
            25,
            62
          ],
          "working": true,
          "migrated": true,
          "future_events_any": [
            "FF_2054_holo_remote_work"
          ]
        },
        "chance": 0.4,
        "options": [
          {
            "key": "go_home",
            "label": "搬回家鄉遠距工作",
            "auto_weight": 0.5,
            "trait_weight": {
              "family_first": 2.2,
              "sensitive_introvert": 1.3
            },
            "effects": {
              "return_home_region": true,
              "happiness": 6,
              "social": 3
            },
            "text": "你搬回了小時候的那條街，戴上頭盔就能進公司開會。",
            "roll": {
              "p": 0.65,
              "world_p": {
                "economy": {
                  "boom": 0.1,
                  "crisis": -0.15
                },
                "climate": {
                  "harsh": -0.1
                }
              },
              "success": {
                "effects": {
                  "happiness": 2
                },
                "text": "老家的生活慢了下來，你重新跟小學同學聯絡上了。"
              },
              "fail": {
                "effects": {
                  "career_mult": 0.94,
                  "happiness": -2
                },
                "text": "遠距久了，升遷機會總是落到常進公司的人身上。"
              }
            }
          },
          {
            "key": "stay_city",
            "label": "留在城市",
            "auto_weight": 0.5,
            "trait_weight": {
              "sociable": 1.8,
              "workaholic": 1.4
            },
            "effects": {},
            "text": "你習慣了城市的節奏，決定留下來。",
            "roll": {
              "p": 0.5,
              "stat_p": {
                "social": 0.004
              },
              "success": {
                "effects": {
                  "career_mult": 1.05
                },
                "text": "留在城市的你接下了新的團隊。"
              },
              "fail": {
                "effects": {
                  "happiness": -3
                },
                "text": "朋友一個個搬回家鄉，你開始覺得城市有點空。"
              }
            }
          }
        ]
      },
      {
        "id": "F2035_ai_companion",
        "tier": "future",
        "era_label": "2030 年代以後 · AI 陪伴",
        "title": "AI 伴侶比人還懂你？",
        "desc": "手機裡的 AI 伴侶記得你說過的每一句話，永遠有空、永遠溫柔。朋友說你最近都不出門了。",
        "source": "虛構推演：依當前生成式 AI 陪伴應用的發展趨勢模擬。",
        "conditions": {
          "year_range": [
            2032,
            2100
          ],
          "age_range": [
            20,
            60
          ],
          "single": true
        },
        "chance": 0.08,
        "trait_chance": {
          "sensitive_introvert": 2.0,
          "sociable": 0.4
        },
        "options": [
          {
            "key": "embrace",
            "label": "跟 AI 伴侶過日子也不錯",
            "auto_weight": 0.35,
            "trait_weight": {
              "sensitive_introvert": 2.0
            },
            "effects": {
              "happiness": 3,
              "social": -5,
              "romance_delay": 5
            },
            "text": "每天晚上，你都跟它聊到睡著。",
            "roll": {
              "p": 0.5,
              "world_p": {
                "ai": {
                  "fast": 0.15,
                  "slow": -0.1
                }
              },
              "success": {
                "effects": {
                  "happiness": 2
                },
                "text": "AI 伴侶陪你走過了一段低潮，你覺得被理解。"
              },
              "fail": {
                "effects": {
                  "happiness": -5,
                  "social": -2
                },
                "text": "服務商突然停止營運，你的 AI 伴侶在一夜之間消失了。"
              }
            }
          },
          {
            "key": "go_out",
            "label": "刪掉 App，報名朋友揪的聚會",
            "auto_weight": 0.65,
            "trait_weight": {
              "sociable": 2.0,
              "family_first": 1.3
            },
            "effects": {
              "social": 4,
              "happiness": -1
            },
            "text": "第一次聚會有點尷尬，但你認識了幾個新朋友。"
          }
        ]
      },
      {
        "id": "F2035_school_merger",
        "tier": "future",
        "era_label": "2030 年代以後 · 少子化併校",
        "title": "家附近的學校要併校了",
        "desc": "孩子的國小只剩一個年級一班，明年要併到鎮上的學校。另一個選擇，是送孩子進城念書。",
        "source": "虛構推演：依國發會少子化推估，偏鄉學校裁併持續增加。",
        "conditions": {
          "year_range": [
            2030,
            2100
          ],
          "age_range": [
            28,
            55
          ],
          "child_age_range": [
            6,
            14
          ],
          "regions_in": [
            "east_islands",
            "south_tainan",
            "central",
            "south_kaohsiung"
          ]
        },
        "chance": 0.15,
        "options": [
          {
            "key": "send_city",
            "label": "送孩子進城念書",
            "auto_weight": 0.35,
            "trait_weight": {
              "workaholic": 1.4,
              "cautious": 1.2
            },
            "effects": {
              "money": -150000,
              "happiness": -2
            },
            "text": "每天清晨你開車送孩子進城，傍晚再接回來。",
            "roll": {
              "p": 0.6,
              "stat_p": {
                "knowledge": 0.004
              },
              "success": {
                "effects": {
                  "knowledge": 2
                },
                "text": "孩子在城裡的學校如魚得水，成績進步很多。"
              },
              "fail": {
                "effects": {
                  "happiness": -3
                },
                "text": "孩子每天通勤兩個小時，越來越沒精神。"
              }
            }
          },
          {
            "key": "local_merge",
            "label": "讓孩子到併校後的學校",
            "auto_weight": 0.65,
            "trait_weight": {
              "family_first": 1.5,
              "civic_minded": 1.4
            },
            "effects": {
              "social": 2
            },
            "text": "你加入了家長會，幫新學校爭取校車。"
          }
        ]
      },
      {
        "id": "F2045_longevity_planning",
        "tier": "future",
        "era_label": "2040 年代以後 · 百歲人生",
        "title": "如果要活到一百歲，錢夠用嗎？",
        "desc": "醫療進步讓百歲不再稀奇。理專提醒你，現在的存款可能只夠用到 85 歲。",
        "source": "虛構推演：依平均壽命延長與超高齡社會趨勢模擬。",
        "conditions": {
          "year_range": [
            2040,
            2100
          ],
          "age_range": [
            50,
            62
          ],
          "working": true
        },
        "chance": 0.06,
        "options": [
          {
            "key": "annuity",
            "label": "買年金與長照保險",
            "auto_weight": 0.4,
            "trait_weight": {
              "cautious": 2.0,
              "family_first": 1.3
            },
            "effects": {
              "money": -300000,
              "flags": [
                "longevity_insured"
              ],
              "happiness": 2
            },
            "outcomes": [
              {
                "delay": [
                  18,
                  25
                ],
                "success": {
                  "effects": {
                    "money": 600000
                  },
                  "text": "當年買的年金開始按月入帳，你的晚年手頭寬裕不少。"
                }
              }
            ],
            "text": "你簽下了一疊保單，心裡踏實了一些。"
          },
          {
            "key": "work_longer",
            "label": "打算做久一點，晚點退休",
            "auto_weight": 0.35,
            "trait_weight": {
              "workaholic": 2.0
            },
            "effects": {
              "flags": [
                "extended_work_70"
              ]
            },
            "text": "你跟主管說，退休的事再談。",
            "roll": {
              "p": 0.65,
              "stat_p": {
                "health": 0.006
              },
              "success": {
                "effects": {
                  "money": 250000
                },
                "text": "多工作的幾年讓你的退休存款厚了不少。"
              },
              "fail": {
                "effects": {
                  "health": -5
                },
                "text": "身體先喊停了，你只好提早退下來。"
              }
            },
            "requires_stats": {
              "health": 45
            }
          },
          {
            "key": "live_now",
            "label": "人生苦短，該花就花",
            "auto_weight": 0.25,
            "trait_weight": {
              "sociable": 1.8,
              "risk_taker": 1.5
            },
            "effects": {
              "money": -150000,
              "happiness": 6
            },
            "text": "你訂了一趟郵輪環島旅行。",
            "roll": {
              "p": 0.5,
              "world_p": {
                "economy": {
                  "boom": 0.15,
                  "crisis": -0.2
                }
              },
              "success": {
                "effects": {
                  "happiness": 2
                },
                "text": "那些旅行成了你晚年最常拿出來講的故事。"
              },
              "fail": {
                "effects": {
                  "savings_rate_bonus": 0.05,
                  "happiness": -3
                },
                "text": "幾年後物價大漲，你有點後悔當年花得太快。"
              }
            }
          }
        ]
      },
      {
        "id": "F2055_cohousing",
        "tier": "future",
        "era_label": "2050 年代以後 · 一人戶時代",
        "title": "一個人老了：要搬進共居宅嗎？",
        "desc": "老家只剩你一個人。社區新蓋的跨世代共居宅有共同廚房和看護站，年輕住戶和長輩互相照應。",
        "source": "虛構推演：延續一人戶比例上升與共居宅普及的趨勢。",
        "conditions": {
          "year_range": [
            2045,
            2110
          ],
          "age_range": [
            68,
            88
          ],
          "single": true
        },
        "chance": 0.07,
        "options": [
          {
            "key": "move_in",
            "label": "搬進共居宅",
            "auto_weight": 0.5,
            "trait_weight": {
              "sociable": 2.0,
              "family_first": 1.2
            },
            "effects": {
              "social": 6,
              "happiness": 4,
              "money": -100000
            },
            "text": "你在共同廚房教年輕住戶包水餃，第一次覺得老了也不寂寞。",
            "roll": {
              "p": 0.7,
              "stat_p": {
                "social": 0.005
              },
              "success": {
                "effects": {
                  "health": 2
                },
                "text": "共居宅的年輕人常拉你去散步，你的身體反而變好了。"
              },
              "fail": {
                "effects": {
                  "happiness": -3
                },
                "text": "你不太習慣跟陌生人共用空間，常常一個人待在房間。"
              }
            }
          },
          {
            "key": "stay_home",
            "label": "留在住慣的老房子",
            "auto_weight": 0.5,
            "trait_weight": {
              "sensitive_introvert": 1.8,
              "cautious": 1.3
            },
            "effects": {
              "happiness": 1,
              "social": -2
            },
            "text": "你習慣了屋裡每一道光線，不想搬。",
            "roll": {
              "p": 0.55,
              "stat_p": {
                "health": 0.006
              },
              "world_p": {
                "ai": {
                  "fast": 0.15
                }
              },
              "success": {
                "effects": {},
                "text": "居家照護和遠距醫療讓你在老房子裡過得很安穩。"
              },
              "fail": {
                "effects": {
                  "health": -5,
                  "happiness": -3
                },
                "text": "一次在家跌倒，過了半天才被鄰居發現。"
              }
            }
          }
        ]
      },
      {
        "id": "T2012_tablet_parenting",
        "tier": "trend",
        "parent_decides": true,
        "era_label": "2010 年代以後 · 平板育兒",
        "title": "要給孩子平板嗎？",
        "desc": "吃飯、坐車、等看診，身邊的小孩人手一台平板。爸媽工作忙，平板一開，孩子就安靜了。",
        "source": "2010 年代智慧型裝置普及，兒童首次接觸螢幕的年齡越來越早，「3C 保母」成為親子教養熱門話題。",
        "conditions": {
          "year_range": [
            2012,
            2045
          ],
          "age_range": [
            3,
            7
          ]
        },
        "chance": 0.3,
        "options": [
          {
            "key": "tablet_free",
            "label": "給平板，讓孩子自己看影片、玩遊戲",
            "auto_weight": 0.45,
            "effects": {
              "happiness": 2,
              "social": -2,
              "knowledge": -1,
              "flags": [
                "screen_heavy_child"
              ]
            },
            "text": "你學會用手指滑影片的年紀，比學會綁鞋帶還早。",
            "outcomes": [
              {
                "delay": [
                  6,
                  10
                ],
                "p": 0.35,
                "success": {
                  "effects": {
                    "knowledge": -3,
                    "health": -2,
                    "happiness": -2
                  },
                  "text": "國中時你每天滑手機到半夜，成績一路往下掉，視力也越來越差。"
                }
              }
            ]
          },
          {
            "key": "limit_screen",
            "label": "限制螢幕時間，帶去公園和圖書館",
            "auto_weight": 0.55,
            "effects": {
              "knowledge": 2,
              "social": 2,
              "health": 1
            },
            "text": "週末你被帶去公園溜滑梯、去圖書館聽故事，偶爾抱怨同學都有平板。"
          }
        ]
      },
      {
        "id": "T2008_bilingual_kindergarten",
        "tier": "trend",
        "parent_decides": true,
        "era_label": "2000 年代以後 · 不能輸在起跑點",
        "title": "雙語幼兒園，還是公幼？",
        "desc": "鄰居的孩子念雙語幼兒園，一個月學費好幾萬，四歲就能用英文自我介紹。公幼便宜，但抽籤不一定抽得到。",
        "source": "2000 年代以後雙語幼兒園與安親才藝大行其道，家庭經濟條件直接拉開孩子的起跑點。",
        "conditions": {
          "year_range": [
            2005,
            2045
          ],
          "age_range": [
            3,
            5
          ]
        },
        "chance": 0.35,
        "options": [
          {
            "key": "bilingual",
            "label": "咬牙送雙語幼兒園，放學再上才藝班",
            "auto_weight": 0.35,
            "requires": {
              "quintile_min": 3
            },
            "effects": {
              "knowledge": 4,
              "happiness": -1,
              "hs_exam_bonus": 2
            },
            "text": "你的書包裡有英文繪本、鋼琴譜和美術課的蠟筆。"
          },
          {
            "key": "stretch_budget",
            "label": "家裡拮据也硬撐著送雙語",
            "auto_weight": 0.1,
            "effects": {
              "knowledge": 3,
              "hardship": [
                1,
                3
              ]
            },
            "text": "爸媽多兼了一份工，只為了讓你跟別人一樣。"
          },
          {
            "key": "public_kinder",
            "label": "念公幼，放學回家玩",
            "auto_weight": 0.55,
            "effects": {
              "happiness": 3,
              "social": 2
            },
            "text": "你的童年是公幼的沙坑和巷口的雜貨店。"
          }
        ]
      },
      {
        "id": "T2014_cap_exam_choice",
        "tier": "era",
        "era_label": "2014 以後 · 十二年國教",
        "title": "會考前的志願：明星高中、技職，還是實驗教育？",
        "desc": "國三了，導師發下志願調查表。爸媽希望你拚明星高中；你對做東西比較有興趣；也有同學要去念實驗學校。",
        "source": "2014 年十二年國教上路，國中會考取代基測；108 課綱後技職與實驗教育的選擇變多。",
        "conditions": {
          "year_range": [
            2014,
            2060
          ],
          "age_range": [
            14,
            14
          ],
          "in_secondary_school": true
        },
        "chance": 0.55,
        "options": [
          {
            "key": "aim_top",
            "label": "拚明星高中，每天補習到晚上十點",
            "auto_weight": 0.45,
            "trait_weight": {
              "workaholic": 2.0,
              "cautious": 1.3
            },
            "effects": {
              "hs_exam_bonus": 5,
              "happiness": -4,
              "health": -1
            },
            "text": "你的國三是考卷、補習班和便利商店的晚餐。",
            "requires_stats": {
              "knowledge": 55
            }
          },
          {
            "key": "vocational_first",
            "label": "技職優先，選有興趣的科系",
            "auto_weight": 0.35,
            "trait_weight": {
              "risk_taker": 1.3,
              "sensitive_introvert": 1.2
            },
            "effects": {
              "happiness": 3,
              "knowledge": 1,
              "flags": [
                "prefers_vocational"
              ]
            },
            "text": "你跟爸媽說想念機械科。他們沉默了一陣子，最後說：「你自己想清楚就好。」"
          },
          {
            "key": "experimental",
            "label": "申請實驗教育學校",
            "auto_weight": 0.2,
            "trait_weight": {
              "civic_minded": 1.8,
              "sociable": 1.3
            },
            "requires": {
              "quintile_min": 3
            },
            "effects": {
              "happiness": 4,
              "social": 3,
              "knowledge": 1,
              "hs_exam_bonus": -3
            },
            "text": "新學校沒有段考排名，你第一次覺得上學是一件有趣的事。"
          }
        ]
      },
      {
        "id": "T2021_learning_portfolio",
        "tier": "trend",
        "era_label": "2020 年代 · 學習歷程",
        "title": "學習歷程檔案：要不要花錢找人包裝？",
        "desc": "108 課綱上路，申請大學要交學習歷程。補習班推出「歷程顧問」套餐，一份要好幾萬。同學有人請顧問、有人自己慢慢做。",
        "source": "2021 年起大學申請入學採計學習歷程檔案，引發城鄉與家庭資源落差的討論。",
        "conditions": {
          "year_range": [
            2021,
            2060
          ],
          "age_range": [
            16,
            17
          ],
          "in_secondary_school": true,
          "edu_min": 3
        },
        "chance": 0.6,
        "options": [
          {
            "key": "hire_consultant",
            "label": "請顧問包裝，衝頂尖校系",
            "auto_weight": 0.25,
            "requires": {
              "quintile_min": 3
            },
            "trait_weight": {
              "workaholic": 1.4,
              "risk_taker": 1.3
            },
            "effects": {
              "uni_admit_bonus": 0.05,
              "happiness": -1
            },
            "text": "顧問幫你把社團、志工和競賽寫成了一個漂亮的故事。"
          },
          {
            "key": "diy",
            "label": "自己做，寫自己真正做過的事",
            "auto_weight": 0.6,
            "trait_weight": {
              "civic_minded": 1.5,
              "sensitive_introvert": 1.3
            },
            "effects": {
              "uni_admit_bonus": 0.02,
              "knowledge": 2
            },
            "text": "你熬夜整理三年的作品，才發現自己其實做了不少事。"
          },
          {
            "key": "focus_exam",
            "label": "不管歷程，專心準備學測",
            "auto_weight": 0.15,
            "trait_weight": {
              "cautious": 1.5
            },
            "effects": {
              "knowledge": 3,
              "happiness": -2
            },
            "text": "你把歷程隨便交了交，把時間全部留給考古題。"
          }
        ]
      },
      {
        "id": "E2021_remote_school",
        "tier": "era",
        "era_label": "2021 · 停課不停學",
        "title": "全國停課：在家線上上課",
        "desc": "疫情升到三級警戒，學校全面停課改成線上教學。鏡頭可以關、麥克風可以靜音，大人也都在家上班。",
        "source": "2021 年 5 月全國三級警戒，各級學校停止到校上課，改為線上教學直到暑假。",
        "conditions": {
          "year_range": [
            2021,
            2021
          ],
          "age_range": [
            8,
            17
          ]
        },
        "chance": 0.7,
        "options": [
          {
            "key": "disciplined",
            "label": "準時上線，自己排讀書進度",
            "auto_weight": 0.35,
            "trait_weight": {
              "cautious": 1.8,
              "workaholic": 1.8
            },
            "effects": {
              "knowledge": 3,
              "social": -2
            },
            "text": "你在房間貼了一張課表，每天照著做完。"
          },
          {
            "key": "slack_off",
            "label": "鏡頭一關就打電動",
            "auto_weight": 0.4,
            "trait_weight": {
              "risk_taker": 1.5,
              "sociable": 1.3
            },
            "effects": {
              "knowledge": -4,
              "happiness": 3
            },
            "text": "那個夏天你的遊戲等級衝得比成績快。"
          },
          {
            "key": "study_group",
            "label": "跟同學開線上讀書會",
            "auto_weight": 0.25,
            "trait_weight": {
              "sociable": 2.0,
              "civic_minded": 1.3
            },
            "effects": {
              "knowledge": 1,
              "social": 3
            },
            "text": "每天晚上你們一起開視訊寫作業，聊天的時間比寫作業還多。"
          }
        ]
      },
      {
        "id": "T2016_creator_dream",
        "tier": "trend",
        "era_label": "2010 年代以後 · 網紅夢",
        "title": "當網紅、打電競：要不要追夢？",
        "desc": "你的直播已經有幾千個追蹤，電競戰隊也來問你要不要試訓。爸媽只希望你好好念書、找份穩定的工作。",
        "source": "2015 年後 YouTuber、實況主、電競選手與 Vtuber 成為新世代熱門的夢想職業，但能以此維生的人仍是少數。",
        "conditions": {
          "year_range": [
            2015,
            2060
          ],
          "age_range": [
            18,
            24
          ]
        },
        "chance": 0.08,
        "trait_chance": {
          "sociable": 1.8,
          "risk_taker": 1.6,
          "cautious": 0.5
        },
        "options": [
          {
            "key": "go_all_in",
            "label": "休學或先不找工作，全心經營",
            "auto_weight": 0.3,
            "trait_weight": {
              "risk_taker": 2.0,
              "sociable": 1.6
            },
            "effects": {
              "happiness": 4,
              "flags": [
                "chased_creator_dream"
              ]
            },
            "roll": {
              "p": 0.12,
              "stat_p": {
                "social": 0.006
              },
              "success": {
                "effects": {
                  "money": 600000,
                  "happiness": 8,
                  "social": 5
                },
                "text": "你的頻道突破十萬訂閱，接到第一支品牌業配。"
              },
              "fail": {
                "effects": {
                  "happiness": -6,
                  "knowledge": -2
                },
                "text": "兩年過去，訂閱數停在幾千人。你默默開始投履歷。"
              }
            },
            "requires_stats": {
              "social": 45
            }
          },
          {
            "key": "side_project",
            "label": "當興趣經營，正事照做",
            "auto_weight": 0.5,
            "trait_weight": {
              "cautious": 1.5,
              "workaholic": 1.3
            },
            "effects": {
              "social": 2,
              "health": -1
            },
            "text": "白天上課上班，晚上剪片直播，睡眠變得很少。"
          },
          {
            "key": "give_up",
            "label": "放棄，好好念書找工作",
            "auto_weight": 0.2,
            "trait_weight": {
              "family_first": 1.6
            },
            "effects": {
              "knowledge": 2,
              "happiness": -3
            },
            "text": "你把麥克風收進櫃子，偶爾還是會點開以前的影片。"
          }
        ]
      },
      {
        "id": "T2018_student_loan",
        "tier": "trend",
        "era_label": "2010 年代以後 · 背著學貸出社會",
        "title": "背著學貸出社會：先還債，還是先存錢？",
        "desc": "畢業第一個月，學貸帳單就寄來了。大學四年的學費加生活費借了好幾十萬，月薪扣掉房租，所剩不多。",
        "source": "不少中低收入家庭的大學生靠就學貸款念完大學，畢業就背著數十萬債務出社會。",
        "conditions": {
          "year_range": [
            2010,
            2060
          ],
          "age_range": [
            22,
            25
          ],
          "working": true,
          "edu_min": 4,
          "quintile_range": [
            1,
            3
          ],
          "max_work_years": 2
        },
        "chance": 0.6,
        "options": [
          {
            "key": "repay_fast",
            "label": "省吃儉用，先把學貸還掉",
            "auto_weight": 0.35,
            "trait_weight": {
              "cautious": 2.0,
              "family_first": 1.3
            },
            "effects": {
              "student_loan": 400000,
              "repay_loan_ratio": 0.6,
              "happiness": -3
            },
            "text": "你每個月把一半的薪水拿去還學貸，三年後終於無債一身輕。"
          },
          {
            "key": "minimum",
            "label": "照最低額慢慢還",
            "auto_weight": 0.45,
            "trait_weight": {
              "sociable": 1.3
            },
            "effects": {
              "student_loan": 400000
            },
            "text": "學貸每個月固定扣款，你幾乎忘了它的存在。"
          },
          {
            "key": "invest_first",
            "label": "學貸利率低，先拿錢去投資",
            "auto_weight": 0.2,
            "trait_weight": {
              "risk_taker": 2.0
            },
            "effects": {
              "student_loan": 400000,
              "to_stock_ratio": 0.5
            },
            "text": "你算了算，學貸利率比股票報酬低，乾脆先買 ETF。"
          }
        ]
      },
      {
        "id": "E2017_crypto_boom",
        "tier": "era",
        "era_label": "2017、2021 · 加密貨幣熱潮",
        "title": "比特幣又創新高：要不要上車？",
        "desc": "同事說他買的幣一個月翻了三倍，群組裡每天都有人貼獲利截圖。你看了看帳戶裡的存款。",
        "source": "比特幣在 2017 年底與 2021 年兩度暴漲，隨後在 2018 年與 2022 年各跌掉七成以上。",
        "conditions": {
          "year_range": [
            2017,
            2021
          ],
          "age_range": [
            20,
            50
          ],
          "working": true,
          "min_liquid_twd_2025": 50000
        },
        "chance": 0.18,
        "trait_chance": {
          "risk_taker": 2.0,
          "sociable": 1.3,
          "cautious": 0.3
        },
        "options": [
          {
            "key": "all_in",
            "label": "重押，梭哈",
            "auto_weight": 0.06,
            "trait_weight": {
              "risk_taker": 3.0,
              "cautious": 0.1
            },
            "effects": {
              "money_liquid_ratio": -0.5,
              "flags": [
                "crypto_all_in"
              ]
            },
            "text": "你把一半的存款換成了幣，每天睡前都要看一次價格。",
            "outcomes": [
              {
                "delay": [
                  1,
                  2
                ],
                "roll": {
                  "p": 0.25,
                  "trait_p": {
                    "cautious": 0.1
                  },
                  "success": {
                    "effects": {
                      "money": 900000,
                      "happiness": 6
                    },
                    "text": "你在高點附近賣掉了，帳戶多了一筆錢，從此對這件事守口如瓶。"
                  },
                  "fail": {
                    "effects": {
                      "money": 100000,
                      "happiness": -8
                    },
                    "text": "幣價崩跌七成，你一路抱到谷底才認賠出場，只拿回一點點。"
                  }
                }
              }
            ]
          },
          {
            "key": "small",
            "label": "小額買一點，當作學費",
            "auto_weight": 0.3,
            "trait_weight": {
              "sociable": 1.5
            },
            "effects": {
              "money": -20000
            },
            "text": "你買了一點點，然後把 App 藏到手機最後一頁。",
            "outcomes": [
              {
                "delay": [
                  1,
                  3
                ],
                "p": 0.4,
                "success": {
                  "effects": {
                    "money": 40000
                  },
                  "text": "當年隨手買的幣漲了一倍，你請朋友吃了一頓大餐。"
                }
              }
            ]
          },
          {
            "key": "no",
            "label": "看不懂的東西不碰",
            "auto_weight": 0.64,
            "trait_weight": {
              "cautious": 2.5,
              "family_first": 1.3
            },
            "effects": {},
            "text": "你把群組設成靜音。"
          }
        ]
      },
      {
        "id": "T2020_pets_not_kids",
        "tier": "trend",
        "era_label": "2020 年代 · 毛小孩",
        "title": "養毛小孩，還是生小孩？",
        "desc": "身邊的朋友一個個養了貓狗，社群上滿是「毛小孩」的照片。你們討論過生小孩，但算了算房租和托育費，又沉默了。",
        "source": "近年台灣家犬貓數量已逼近甚至超過 15 歲以下兒童人數，「毛小孩取代小孩」成為少子化的縮影。",
        "conditions": {
          "year_range": [
            2020,
            2060
          ],
          "age_range": [
            27,
            42
          ],
          "no_children": true,
          "not_homeowner": true
        },
        "chance": 0.12,
        "options": [
          {
            "key": "adopt_pet",
            "label": "領養一隻貓狗，先這樣就好",
            "auto_weight": 0.45,
            "trait_weight": {
              "sensitive_introvert": 1.6,
              "family_first": 1.2
            },
            "effects": {
              "happiness": 5,
              "money": -30000,
              "desired_kids_delta": -1
            },
            "text": "家裡多了一個會在門口等你下班的小傢伙。"
          },
          {
            "key": "plan_kids",
            "label": "還是想要有自己的孩子",
            "auto_weight": 0.3,
            "trait_weight": {
              "family_first": 2.0
            },
            "effects": {
              "desired_kids_delta": 1
            },
            "text": "你們開始認真算托育補助和育嬰假。"
          },
          {
            "key": "neither",
            "label": "兩個都不要，照顧好自己就好",
            "auto_weight": 0.25,
            "trait_weight": {
              "risk_taker": 1.3,
              "workaholic": 1.4
            },
            "effects": {
              "happiness": 1
            },
            "text": "週末你們睡到自然醒，然後去咖啡店坐一下午。"
          }
        ]
      },
      {
        "id": "T2010_new_immigrant_child",
        "tier": "trend",
        "era_label": "2000 年代以後 · 新住民第二代",
        "title": "媽媽的語言，要學嗎？",
        "desc": "你的媽媽來自越南（或印尼、中國大陸）。小時候有同學笑你媽媽講話有口音，你開始不想讓別人知道。這個暑假，媽媽問你要不要跟她回外婆家。",
        "source": "2000 年代起新住民子女人數快速增加；2019 年 108 課綱將新住民語文列入國小必選課程。",
        "conditions": {
          "year_range": [
            2005,
            2060
          ],
          "age_range": [
            10,
            16
          ],
          "origin_in": [
            "new_immigrant"
          ]
        },
        "chance": 0.4,
        "options": [
          {
            "key": "learn_mother_tongue",
            "label": "跟媽媽學母語，暑假回外婆家",
            "auto_weight": 0.5,
            "trait_weight": {
              "family_first": 2.0,
              "civic_minded": 1.4
            },
            "effects": {
              "knowledge": 3,
              "social": 2,
              "happiness": 3,
              "flags": [
                "heritage_bilingual"
              ]
            },
            "text": "外婆家的院子裡有你沒吃過的水果，表哥表姊教你說了好多新的字。",
            "outcomes": [
              {
                "delay": [
                  10,
                  16
                ],
                "p": 0.4,
                "success": {
                  "effects": {
                    "wage_mult": 1.06,
                    "happiness": 3
                  },
                  "text": "公司拓展東南亞市場，會說媽媽母語的你被派去當窗口，薪水也跟著調了。"
                }
              }
            ]
          },
          {
            "key": "hide_it",
            "label": "在學校不提媽媽是哪裡人",
            "auto_weight": 0.5,
            "trait_weight": {
              "sensitive_introvert": 1.8,
              "cautious": 1.3
            },
            "effects": {
              "happiness": -3,
              "social": 1
            },
            "text": "你學會了在同學面前只講國語。很多年後，你才後悔當年沒跟媽媽多說幾句她的話。"
          }
        ]
      },
      {
        "id": "F2040_market_crash",
        "tier": "future",
        "era_label": "2040 年代以後 · 又一次股災",
        "title": "股市一個月跌掉三成：你要怎麼辦？",
        "desc": "全球債務危機爆發，你的持股一個月內跌掉三成。新聞說這可能是二十年來最嚴重的衰退，也有人說是百年一遇的買點。",
        "source": "虛構推演：延續「金融危機頻仍」的世界線。",
        "conditions": {
          "year_range": [
            2038,
            2095
          ],
          "age_range": [
            28,
            75
          ],
          "world_line": {
            "economy": [
              "crisis"
            ]
          },
          "min_liquid_twd_2025": 200000
        },
        "chance": 0.12,
        "options": [
          {
            "key": "panic_sell",
            "label": "全部賣掉，先保住現金",
            "auto_weight": 0.35,
            "trait_weight": {
              "cautious": 1.8,
              "sensitive_introvert": 1.4
            },
            "effects": {
              "stock_ratio": -0.3,
              "stock_sell_ratio": 1.0
            },
            "roll": {
              "p": 0.4,
              "success": {
                "effects": {
                  "happiness": 2
                },
                "text": "股市又跌了一年，你慶幸自己跑得快。"
              },
              "fail": {
                "effects": {
                  "happiness": -5
                },
                "text": "你賣在最低點，半年後股市就反彈了。"
              }
            }
          },
          {
            "key": "hold",
            "label": "抱著不動，等它回來",
            "auto_weight": 0.45,
            "trait_weight": {
              "family_first": 1.2
            },
            "effects": {
              "stock_ratio": -0.3
            },
            "roll": {
              "p": 0.6,
              "success": {
                "effects": {
                  "stock_ratio": 0.35
                },
                "text": "三年後股市回到了原點，甚至更高。"
              },
              "fail": {
                "effects": {
                  "stock_ratio": -0.15,
                  "happiness": -3
                },
                "text": "這次的熊市特別長，帳面虧損一直沒有回來。"
              }
            }
          },
          {
            "key": "buy_more",
            "label": "危機入市，加碼買進",
            "auto_weight": 0.2,
            "trait_weight": {
              "risk_taker": 2.5,
              "cautious": 0.3
            },
            "effects": {
              "stock_ratio": -0.3,
              "to_stock_ratio": 0.5
            },
            "roll": {
              "p": 0.55,
              "success": {
                "effects": {
                  "stock_ratio": 0.6,
                  "happiness": 5
                },
                "text": "你買在相對低點，幾年後資產翻了一倍。"
              },
              "fail": {
                "effects": {
                  "stock_ratio": -0.25,
                  "happiness": -6
                },
                "text": "底下還有底，你的加碼成了更深的套牢。"
              }
            }
          }
        ],
        "trait_chance": {
          "risk_taker": 1.3
        }
      },
      {
        "id": "F2045_geo_hedge",
        "tier": "future",
        "era_label": "2030 年代以後 · 局勢緊張",
        "title": "局勢緊張：要不要替家人準備一條退路？",
        "desc": "周邊演習越來越頻繁，身邊有人開始把資產轉到海外、替孩子辦外國護照，也有人報名了民防訓練。",
        "source": "虛構推演：延續「區域局勢緊張」的世界線。",
        "conditions": {
          "year_range": [
            2032,
            2080
          ],
          "age_range": [
            28,
            70
          ],
          "world_line": {
            "geo": [
              "tense"
            ]
          }
        },
        "chance": 0.12,
        "options": [
          {
            "key": "offshore",
            "label": "把部分資產換成外幣、放到海外",
            "auto_weight": 0.3,
            "trait_weight": {
              "cautious": 2.0,
              "family_first": 1.3
            },
            "effects": {
              "money_liquid_ratio": -0.02
            },
            "roll": {
              "p": 0.5,
              "world_p": {
                "economy": {
                  "crisis": -0.15
                }
              },
              "success": {
                "effects": {
                  "happiness": 2
                },
                "text": "外幣資產讓你安心了不少，匯率也站在你這邊。"
              },
              "fail": {
                "effects": {
                  "money_liquid_ratio": -0.06
                },
                "text": "匯率反向走了一大段，換出去的錢縮水了。"
              }
            }
          },
          {
            "key": "civil_defense",
            "label": "留下來，報名民防與急救訓練",
            "auto_weight": 0.35,
            "trait_weight": {
              "civic_minded": 2.5,
              "family_first": 1.2
            },
            "effects": {
              "social": 4,
              "knowledge": 2,
              "flags": [
                "civil_defense_trained"
              ]
            },
            "text": "你學會了止血包紮和避難所的位置，也認識了一群鄰居。"
          },
          {
            "key": "carry_on",
            "label": "照常過日子",
            "auto_weight": 0.35,
            "trait_weight": {
              "risk_taker": 1.3,
              "workaholic": 1.3
            },
            "effects": {},
            "text": "你關掉新聞，照常去上班。"
          }
        ]
      },
      {
        "id": "F2050_child_emigrates",
        "tier": "future",
        "era_label": "2040 年代以後 · 下一代出走",
        "title": "孩子說想移民到國外",
        "desc": "孩子在國外念完書，拿到了當地的工作機會，打電話回來說想留在那裡，問你們會不會反對。",
        "source": "虛構推演：依人口外移與跨國就業的長期趨勢推演。",
        "conditions": {
          "year_range": [
            2040,
            2100
          ],
          "age_range": [
            48,
            72
          ],
          "children_min": 1,
          "child_age_range": [
            24,
            36
          ]
        },
        "chance": 0.08,
        "options": [
          {
            "key": "support",
            "label": "支持他，自己的人生自己決定",
            "auto_weight": 0.55,
            "trait_weight": {
              "civic_minded": 1.4,
              "risk_taker": 1.3
            },
            "effects": {
              "happiness": -2,
              "social": -1
            },
            "roll": {
              "p": 0.6,
              "world_p": {
                "geo": {
                  "tense": 0.1
                },
                "economy": {
                  "boom": -0.1
                }
              },
              "success": {
                "effects": {
                  "happiness": 4
                },
                "text": "孩子在國外過得很好，每年接你們過去住一個月。"
              },
              "fail": {
                "effects": {
                  "happiness": -4
                },
                "text": "時差和距離讓聯絡越來越少，年夜飯的桌子空了一個位子。"
              }
            }
          },
          {
            "key": "ask_return",
            "label": "希望他回台灣，離家近一點",
            "auto_weight": 0.45,
            "trait_weight": {
              "family_first": 2.0
            },
            "roll": {
              "p": 0.4,
              "success": {
                "effects": {
                  "happiness": 4,
                  "social": 2
                },
                "text": "孩子最後回來了，在附近買了房子，週末常帶孫子回家。"
              },
              "fail": {
                "effects": {
                  "happiness": -5,
                  "social": -2
                },
                "text": "孩子還是留在國外，那通電話之後，你們有好一陣子沒聯絡。"
              }
            }
          }
        ]
      },
      {
        "id": "F2050_coastal_move",
        "tier": "future",
        "era_label": "2040 年代以後 · 氣候遷徙",
        "title": "家附近又淹水了：要不要搬離沿海？",
        "desc": "這幾年每逢大潮和颱風就淹水，房價一路下跌。政府有遷村補助，但要離開住了大半輩子的地方。",
        "source": "虛構推演：延續「極端氣候加劇」的世界線。",
        "conditions": {
          "year_range": [
            2042,
            2100
          ],
          "age_range": [
            30,
            80
          ],
          "world_line": {
            "climate": [
              "harsh"
            ]
          },
          "regions_in": [
            "south_tainan",
            "south_kaohsiung",
            "east_islands"
          ]
        },
        "chance": 0.12,
        "options": [
          {
            "key": "relocate",
            "label": "領補助，搬到內陸新市鎮",
            "auto_weight": 0.45,
            "trait_weight": {
              "cautious": 1.8
            },
            "effects": {
              "happiness": -3,
              "money": 100000
            },
            "roll": {
              "p": 0.65,
              "success": {
                "effects": {
                  "happiness": 4
                },
                "text": "新市鎮的房子不會再淹水，你終於睡得安穩。"
              },
              "fail": {
                "effects": {
                  "social": -4
                },
                "text": "新的地方什麼都好，就是沒有熟悉的鄰居。"
              }
            }
          },
          {
            "key": "stay_raise",
            "label": "留下來，把房子墊高",
            "auto_weight": 0.55,
            "trait_weight": {
              "family_first": 1.6,
              "risk_taker": 1.3
            },
            "effects": {
              "money": -200000
            },
            "roll": {
              "p": 0.5,
              "world_p": {
                "climate": {
                  "harsh": -0.1
                }
              },
              "success": {
                "effects": {
                  "happiness": 2
                },
                "text": "墊高後的房子撐過了好幾次大潮。"
              },
              "fail": {
                "effects": {
                  "health": -3,
                  "happiness": -6,
                  "money": -200000
                },
                "text": "一場前所未見的暴潮還是淹進了屋裡。"
              }
            }
          }
        ]
      },
      {
        "id": "F2055_healthspan",
        "tier": "future",
        "era_label": "2050 年代以後 · 抗老醫學",
        "title": "自費抗老療程：值得嗎？",
        "desc": "醫院推出自費的細胞抗老療程，宣稱能讓身體年齡年輕十歲。價格不便宜，效果也還有爭議。",
        "source": "虛構推演：依長壽醫學的研發趨勢推演。",
        "conditions": {
          "year_range": [
            2050,
            2110
          ],
          "age_range": [
            55,
            80
          ],
          "min_liquid_twd_2025": 300000
        },
        "chance": 0.1,
        "options": [
          {
            "key": "try_it",
            "label": "花錢試試看",
            "auto_weight": 0.35,
            "trait_weight": {
              "risk_taker": 1.6,
              "cautious": 0.8
            },
            "effects": {
              "money": -250000
            },
            "roll": {
              "p": 0.45,
              "world_p": {
                "ai": {
                  "fast": 0.2,
                  "slow": -0.15
                }
              },
              "success": {
                "effects": {
                  "health": 8,
                  "mortality_mult": 0.9,
                  "happiness": 3
                },
                "text": "療程後你爬山不再喘，醫師說你的身體年齡少了好幾歲。"
              },
              "fail": {
                "effects": {
                  "happiness": -3
                },
                "text": "錢花了，身體卻沒什麼變化。"
              }
            }
          },
          {
            "key": "natural",
            "label": "規律運動和飲食就好",
            "auto_weight": 0.65,
            "trait_weight": {
              "cautious": 1.6,
              "family_first": 1.2
            },
            "effects": {
              "health": 2
            },
            "text": "你每天早上去公園快走，晚餐少吃一點。"
          }
        ]
      },
      {
        "id": "F2058_elder_care_choice",
        "tier": "future",
        "era_label": "2050 年代以後 · 誰來照顧你",
        "title": "年紀大了，誰來照顧你？",
        "desc": "身體大不如前，日常生活開始需要人幫忙。可以請照護機器人、聘外籍看護，或是搬去和孩子同住。",
        "source": "虛構推演：依高齡照護人力與科技發展趨勢推演。",
        "conditions": {
          "year_range": [
            2050,
            2120
          ],
          "age_range": [
            78,
            95
          ]
        },
        "chance": 0.18,
        "options": [
          {
            "key": "robot",
            "label": "請照護機器人",
            "auto_weight": 0.35,
            "trait_weight": {
              "sensitive_introvert": 1.6
            },
            "effects": {
              "money": -150000
            },
            "roll": {
              "p": 0.5,
              "world_p": {
                "ai": {
                  "fast": 0.3,
                  "slow": -0.2
                }
              },
              "success": {
                "effects": {
                  "health": 3,
                  "happiness": 2
                },
                "text": "機器人比你想像的貼心，還會提醒你孫子的生日。"
              },
              "fail": {
                "effects": {
                  "happiness": -4,
                  "social": -3
                },
                "text": "機器人照顧得很周到，但你一整天都沒跟人說過話。"
              }
            }
          },
          {
            "key": "caregiver",
            "label": "聘請外籍看護",
            "auto_weight": 0.35,
            "trait_weight": {
              "cautious": 1.3
            },
            "effects": {
              "money": -200000
            },
            "roll": {
              "p": 0.6,
              "world_p": {
                "demo": {
                  "decline": -0.15
                }
              },
              "success": {
                "effects": {
                  "health": 3,
                  "social": 2
                },
                "text": "看護阿妹很細心，你教她講台語，她教你做家鄉菜。"
              },
              "fail": {
                "effects": {
                  "happiness": -3
                },
                "text": "看護人力短缺，換了三個人都留不久。"
              }
            }
          },
          {
            "key": "move_child",
            "label": "搬去和孩子同住",
            "auto_weight": 0.3,
            "trait_weight": {
              "family_first": 2.2
            },
            "requires": {
              "has_children": true
            },
            "roll": {
              "p": 0.55,
              "stat_p": {
                "social": 0.005
              },
              "success": {
                "effects": {
                  "happiness": 5,
                  "social": 3
                },
                "text": "每天看著孫子上下學，是你晚年最開心的事。"
              },
              "fail": {
                "effects": {
                  "happiness": -4
                },
                "text": "兩代人的生活習慣不同，摩擦越來越多。"
              }
            }
          }
        ]
      },
      {
        "id": "F2060_digital_legacy",
        "tier": "future",
        "era_label": "2050 年代以後 · 數位分身",
        "title": "要不要替自己做一個數位分身？",
        "desc": "新的服務可以用你的照片、聲音和對話紀錄，做出一個 AI 數位分身，等你走了之後，家人還能跟「你」說話。",
        "source": "虛構推演：依生成式 AI 數位人與數位遺產的發展趨勢推演。",
        "conditions": {
          "year_range": [
            2050,
            2120
          ],
          "age_range": [
            70,
            98
          ]
        },
        "chance": 0.1,
        "options": [
          {
            "key": "make_it",
            "label": "做一個，留給家人",
            "auto_weight": 0.4,
            "trait_weight": {
              "family_first": 1.6,
              "sociable": 1.3
            },
            "effects": {
              "money": -50000,
              "happiness": 3
            },
            "roll": {
              "p": 0.55,
              "world_p": {
                "ai": {
                  "fast": 0.2
                }
              },
              "success": {
                "effects": {},
                "text": "錄製的過程讓你把一輩子的故事又說了一遍，孫子聽得入迷。"
              },
              "fail": {
                "effects": {
                  "happiness": -2
                },
                "text": "數位分身說話的樣子有點陌生，家人看了反而難過。"
              }
            }
          },
          {
            "key": "write_letters",
            "label": "不用了，親手寫幾封信就好",
            "auto_weight": 0.6,
            "trait_weight": {
              "sensitive_introvert": 1.6,
              "cautious": 1.3
            },
            "effects": {
              "happiness": 2,
              "social": 1
            },
            "text": "你一筆一劃寫下想對每個家人說的話。"
          }
        ]
      },
      {
        "id": "F2048_midlife_pivot",
        "tier": "future",
        "era_label": "2040 年代以後 · 中年轉職",
        "title": "四十多歲，要不要轉換跑道？",
        "desc": "產業變化越來越快，你所在的行業前景不明。政府和企業都在推「第二人生學程」，但轉職意味著從頭開始。",
        "source": "虛構推演：依產業轉型與終身學習的趨勢推演。",
        "conditions": {
          "year_range": [
            2040,
            2100
          ],
          "age_range": [
            42,
            52
          ],
          "working": true
        },
        "chance": 0.08,
        "options": [
          {
            "key": "pivot",
            "label": "報名學程，轉換跑道",
            "auto_weight": 0.35,
            "trait_weight": {
              "risk_taker": 1.8,
              "workaholic": 1.3
            },
            "effects": {
              "money": -80000,
              "knowledge": 4
            },
            "roll": {
              "p": 0.5,
              "stat_p": {
                "knowledge": 0.006
              },
              "world_p": {
                "economy": {
                  "boom": 0.15,
                  "crisis": -0.2
                }
              },
              "success": {
                "effects": {
                  "career_mult": 1.12,
                  "happiness": 5
                },
                "text": "新的工作讓你重新找回熱情，薪水也比以前高。"
              },
              "fail": {
                "effects": {
                  "career_mult": 0.9,
                  "happiness": -4
                },
                "text": "新領域的門比想像中難進，你最後回到原本的行業，年資卻斷了。"
              }
            },
            "requires_stats": {
              "knowledge": 50
            }
          },
          {
            "key": "stay",
            "label": "留在熟悉的行業",
            "auto_weight": 0.65,
            "trait_weight": {
              "cautious": 1.8,
              "family_first": 1.3
            },
            "roll": {
              "p": 0.6,
              "world_p": {
                "ai": {
                  "fast": -0.15
                },
                "economy": {
                  "crisis": -0.15
                }
              },
              "success": {
                "effects": {},
                "text": "你的資歷在這一行還是很吃香。"
              },
              "fail": {
                "effects": {
                  "career_mult": 0.92,
                  "happiness": -3
                },
                "text": "行業持續萎縮，公司兩年沒調薪。"
              }
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
          {
            "text": "國小下課後留校寫完滿滿一疊測驗卷，放學天色都黑了。",
            "min_age": 7,
            "max_age": 12,
            "requires_student": true
          },
          {
            "text": "同學家裡靠賣菜供哥哥讀省中，姊姊國中畢業就進成衣廠貼補家用。",
            "min_age": 10,
            "max_age": 17,
            "requires_student": true
          },
          {
            "text": "鎮上只有幾家書店，考前大家輪流傳抄油印的考古題講義。",
            "min_age": 10,
            "max_age": 18,
            "requires_student": true
          }
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
          {
            "text": "每天放學背著沉重書包擠公車去補習街搶前排座位，手裡抓著十元麵包當晚餐。",
            "min_age": 13,
            "max_age": 18,
            "requires_student": true
          },
          {
            "text": "考上國立五專讓全家族放鞭炮慶祝，長輩說學一技之長最實在。",
            "min_age": 14,
            "max_age": 16,
            "requires_student": true
          },
          {
            "text": "聯考倒數百日，全班在教室後方貼滿紅紙誓師，夜晚路燈下全是背英文單字的身影。",
            "min_age": 15,
            "max_age": 18,
            "requires_student": true
          }
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
          {
            "text": "小學放學直接搭安親班娃娃車，接著上兒童美語與珠心算，晚上八點才回家吃飯。",
            "min_age": 7,
            "max_age": 12,
            "requires_student": true
          },
          {
            "text": "大學錄取率大幅攀升，長輩開始改口叮嚀「光念大學不夠，還要念國立研究所」。",
            "min_age": 16,
            "max_age": 22,
            "min_year": 1999,
            "requires_student": true
          },
          {
            "text": "推甄申請入學要準備備審資料與才藝證明，家庭資源的落差逐漸顯現。",
            "min_age": 16,
            "max_age": 18,
            "min_year": 1998,
            "requires_student": true
          }
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
          {
            "text": "十二年國教會考上路後，補習班招牌仍比巷口超商密集，考前模擬考一場接一場。",
            "min_year": 2014,
            "max_year": 2026,
            "min_age": 13,
            "max_age": 15,
            "requires_student": true
          },
          {
            "text": "補習班招牌比巷口超商還密集，週末還得趕場寫程式營隊與整理 108 課綱學習歷程檔案。",
            "min_year": 2019,
            "min_age": 13,
            "max_age": 18,
            "max_year": 2035,
            "requires_student": true
          },
          {
            "text": "雙語私校抽籤與入學考擠破頭，家長群組天天討論學區設籍與雙語教材。",
            "min_age": 6,
            "max_age": 12,
            "min_year": 2012,
            "max_year": 2030,
            "requires_student": true
          },
          {
            "text": "母校國小今年新生減班，老師感嘆十年前每個年級還有八個班。",
            "min_age": 9,
            "max_age": 18,
            "requires_student": true
          }
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
        "salary_mult_min": 0.42,
        "salary_mult_max": 0.72,
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
        "flavor": "看天吃飯，早起巡田或出海，易受颱風與 2002 年 WTO 進口農產衝擊。",
        "pick_weight": 1.1,
        "female_weight": 0.7
      },
      {
        "id": "car_civil_teacher",
        "name": "軍公教／國營事業",
        "era_range": [
          1950,
          2130
        ],
        "salary_mult_min": 0.98,
        "salary_mult_max": 1.22,
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
        "flavor": "工作極度穩定，1950–60 年代含實物配給與眷舍，2008 海嘯後更是青年避風港。",
        "entry": "civil"
      },
      {
        "id": "car_epz_worker",
        "name": "工廠作業員",
        "era_range": [
          1950,
          2130
        ],
        "salary_mult_min": 0.56,
        "salary_mult_max": 0.78,
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
        "flavor": "從紡織廠、加工出口區到科技廠產線，撐起台灣外銷的基層主力。",
        "max_edu_level": 3,
        "pick_weight": 2.2,
        "female_weight": 1.5
      },
      {
        "id": "car_craft_apprentice",
        "name": "傳統技藝師傅（水電／木工／車床）",
        "era_range": [
          1950,
          2130
        ],
        "salary_mult_min": 0.68,
        "salary_mult_max": 1.12,
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
        "flavor": "熬過學徒出師後憑一技之長立身，近年缺工反讓老師傅身價看漲。",
        "pick_weight": 1.4,
        "max_edu_level": 3,
        "female_weight": 0.22
      },
      {
        "id": "car_export_sales",
        "name": "外銷貿易業務（一卡皮箱走天下）",
        "era_range": [
          1970,
          2130
        ],
        "salary_mult_min": 0.9,
        "salary_mult_max": 1.4,
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
        "flavor": "提著裝滿樣品的一卡皮箱飛往歐美參展接單，撐起台灣外銷奇蹟。",
        "pick_weight": 0.8
      },
      {
        "id": "car_sme_boss",
        "name": "傳產頭家／中小企業廠主",
        "pick_weight": 0.3,
        "era_range": [
          1970,
          2130
        ],
        "salary_mult_min": 0.7,
        "salary_mult_max": 2.1,
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
        "flavor": "從「客廳即工廠」黑手變頭家，順風時買透天、逆風時須扛關稅與軋票壓力。",
        "female_weight": 0.5
      },
      {
        "id": "car_doctor_pharma",
        "name": "醫師／牙醫師",
        "era_range": [
          1955,
          2130
        ],
        "salary_mult_min": 2.6,
        "salary_mult_max": 3.9,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung",
          "south_tainan"
        ],
        "min_edu_level": 4,
        "required_majors": [
          "med_health"
        ],
        "preferred_majors": [
          "med_health"
        ],
        "stability": 0.96,
        "health_drain": 0.85,
        "remote_capable": false,
        "flavor": "醫學系六至七年養成並通過國考與住院醫師訓練，2025 調查醫師年薪中位數逾 211 萬元居各業之冠。",
        "required_sub_majors": [
          "med_doctor"
        ],
        "entry": "license",
        "auto_license": true
      },
      {
        "id": "car_lawyer_cpa",
        "name": "律師／法務顧問",
        "era_range": [
          1955,
          2130
        ],
        "salary_mult_min": 1.35,
        "salary_mult_max": 2.4,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung",
          "south_tainan"
        ],
        "min_edu_level": 4,
        "required_majors": [
          "humanities_biz"
        ],
        "preferred_majors": [
          "humanities_biz"
        ],
        "stability": 0.92,
        "health_drain": 0.75,
        "remote_capable": false,
        "flavor": "須法律系背景並通過律師高考，早年錄取率僅個位數。",
        "required_sub_majors": [
          "law"
        ],
        "entry": "license",
        "exam_name": "律師高考",
        "fallback_title": "法務專員",
        "pass_rate_points": [
          [
            1955,
            0.03
          ],
          [
            1988,
            0.06
          ],
          [
            2000,
            0.08
          ],
          [
            2011,
            0.12
          ],
          [
            2100,
            0.12
          ]
        ]
      },
      {
        "id": "car_finance_broker",
        "name": "金融銀行／證券營業員／房仲",
        "era_range": [
          1980,
          2130
        ],
        "salary_mult_min": 1.05,
        "salary_mult_max": 1.9,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung"
        ],
        "min_edu_level": 4,
        "required_majors": [
          "humanities_biz",
          "stem_eng"
        ],
        "preferred_majors": [
          "humanities_biz"
        ],
        "stability": 0.78,
        "health_drain": 0.6,
        "remote_capable": true,
        "flavor": "1987–1990 股市狂潮年終豐厚，2024 金融保險業年薪中位數達 110.6 萬元。",
        "required_sub_majors": [
          "biz",
          "law",
          "stem_eng"
        ],
        "pick_weight": 0.7
      },
      {
        "id": "car_hsinchu_semi",
        "name": "半導體／IC 設計／AI 工程師",
        "era_range": [
          1980,
          2130
        ],
        "salary_mult_min": 1.3,
        "salary_mult_max": 2.4,
        "preferred_regions": [
          "north_hsinchu",
          "south_tainan",
          "central",
          "south_kaohsiung"
        ],
        "min_edu_level": 4,
        "required_majors": [
          "stem_eng"
        ],
        "allow_cross_coding": true,
        "preferred_majors": [
          "stem_eng"
        ],
        "stability": 0.88,
        "health_drain": 1.1,
        "remote_capable": true,
        "flavor": "1990–2007 享股票分紅配股紅利，2020s 乘 AI 出口浪潮成為高薪代表但輪班工時長。",
        "pick_weight": 1.3,
        "female_weight": 0.5
      },
      {
        "id": "car_cram_service_mgr",
        "name": "補教老師／連鎖服務業店長",
        "era_range": [
          1985,
          2130
        ],
        "salary_mult_min": 0.72,
        "salary_mult_max": 1.15,
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
        "flavor": "伴隨服務業就業破六成與補教熱潮而起，工時多集中晚間與假日。",
        "pick_weight": 0.8
      },
      {
        "id": "car_software_remote",
        "name": "軟體工程師／系統架構師",
        "era_range": [
          1998,
          2130
        ],
        "salary_mult_min": 1.1,
        "salary_mult_max": 1.8,
        "preferred_regions": [
          "north_taipei",
          "north_hsinchu",
          "central"
        ],
        "min_edu_level": 4,
        "required_majors": [
          "stem_eng"
        ],
        "allow_cross_coding": true,
        "preferred_majors": [
          "stem_eng"
        ],
        "stability": 0.84,
        "health_drain": 0.6,
        "remote_capable": true,
        "flavor": "新鮮人起薪居各職務前段，2020 後具備跨國遠距與數位游牧彈性。",
        "pick_weight": 0.9,
        "female_weight": 0.5
      },
      {
        "id": "car_gig_delivery",
        "name": "外送員／平台司機（零工經濟）",
        "era_range": [
          2016,
          2130
        ],
        "salary_mult_min": 0.58,
        "salary_mult_max": 0.85,
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
        "flavor": "時間彈性且門檻低，但缺乏職涯累積並承擔較高機車交通與日曬雨淋風險。",
        "pick_weight": 0.5,
        "max_switch_age": 50,
        "female_weight": 0.4
      },
      {
        "id": "car_creator_ecom",
        "name": "自媒體／電商直播主／斜槓創作者",
        "era_range": [
          2014,
          2130
        ],
        "salary_mult_min": 0.4,
        "salary_mult_max": 1.5,
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
        "flavor": "高度 M 型化新興職涯，極少數爆紅致富，多數須面對演算法與流量焦慮。",
        "pick_weight": 0.25,
        "max_switch_age": 40
      },
      {
        "id": "car_healthcare_ltc",
        "name": "醫療護理師／長照居服員",
        "era_range": [
          1955,
          2130
        ],
        "salary_mult_min": 0.82,
        "salary_mult_max": 1.12,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung",
          "east_islands",
          "south_tainan"
        ],
        "min_edu_level": 3,
        "required_majors_if_uni": [
          "med_health"
        ],
        "preferred_majors": [
          "med_health"
        ],
        "stability": 0.94,
        "health_drain": 1.0,
        "remote_capable": false,
        "flavor": "超高齡社會最不可或缺的剛性專業，輪班護病比高但幾乎沒有失業風險。",
        "female_weight": 2.4
      },
      {
        "id": "car_tourism_hospitality",
        "name": "觀光旅宿／餐飲從業人員",
        "era_range": [
          1955,
          2130
        ],
        "salary_mult_min": 0.56,
        "salary_mult_max": 0.82,
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
        "flavor": "花東離島與古都核心產業，受景氣、地震與 2021 疫情無薪假衝擊最直接。",
        "female_weight": 1.3
      },
      {
        "id": "car_office_white_collar",
        "name": "一般民間企業白領／行政／財會／行銷",
        "pick_weight": 2.4,
        "era_range": [
          1965,
          2130
        ],
        "salary_mult_min": 0.64,
        "salary_mult_max": 1.1,
        "preferred_regions": [
          "north_taipei",
          "north_hsinchu",
          "central",
          "south_tainan",
          "south_kaohsiung"
        ],
        "min_edu_level": 3,
        "preferred_majors": [
          "humanities_biz",
          "stem_eng"
        ],
        "stability": 0.86,
        "health_drain": 0.5,
        "remote_capable": false,
        "flavor": "台灣就業人數最龐大的中產受薪骨幹，貼近主計總處薪資中位數，安穩但須面對通膨與房貸壓力。",
        "female_weight": 1.35
      },
      {
        "id": "car_pharma_medtech",
        "name": "藥師／醫檢師／治療師",
        "era_range": [
          1955,
          2130
        ],
        "salary_mult_min": 1.0,
        "salary_mult_max": 1.4,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung",
          "south_tainan"
        ],
        "min_edu_level": 4,
        "required_majors": [
          "med_health"
        ],
        "required_sub_majors": [
          "health_allied"
        ],
        "preferred_majors": [
          "med_health"
        ],
        "pick_weight": 1.6,
        "stability": 0.94,
        "health_drain": 0.6,
        "remote_capable": false,
        "flavor": "藥學、醫技與復健專業，考取證照後在醫院、診所與藥局執業。"
      },
      {
        "id": "car_cpa",
        "name": "會計師",
        "era_range": [
          1955,
          2130
        ],
        "salary_mult_min": 1.25,
        "salary_mult_max": 2.1,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung"
        ],
        "min_edu_level": 4,
        "required_majors": [
          "humanities_biz"
        ],
        "required_sub_majors": [
          "biz"
        ],
        "preferred_majors": [
          "humanities_biz"
        ],
        "entry": "license",
        "exam_name": "會計師高考",
        "fallback_title": "會計／查帳員",
        "pass_rate_points": [
          [
            1955,
            0.04
          ],
          [
            1988,
            0.08
          ],
          [
            2005,
            0.1
          ],
          [
            2100,
            0.12
          ]
        ],
        "stability": 0.92,
        "health_drain": 0.75,
        "remote_capable": false,
        "flavor": "須商管會計背景並通過會計師高考，忙季徹夜查帳。"
      },
      {
        "id": "car_service_worker",
        "name": "門市／保全／清潔服務人員",
        "era_range": [
          1950,
          2130
        ],
        "salary_mult_min": 0.5,
        "salary_mult_max": 0.7,
        "preferred_regions": [
          "north_taipei",
          "central",
          "south_kaohsiung",
          "south_tainan"
        ],
        "min_edu_level": 0,
        "max_edu_level": 3,
        "preferred_majors": [],
        "pick_weight": 1.8,
        "stability": 0.78,
        "health_drain": 0.6,
        "remote_capable": false,
        "flavor": "百貨、商店、餐館與大樓裡最常見的面孔，薪水貼近基本工資。",
        "female_weight": 1.3
      },
      {
        "id": "car_driver_logistics",
        "name": "司機／物流倉儲人員",
        "era_range": [
          1955,
          2130
        ],
        "salary_mult_min": 0.62,
        "salary_mult_max": 0.95,
        "preferred_regions": [
          "north_hsinchu",
          "central",
          "south_kaohsiung"
        ],
        "min_edu_level": 1,
        "max_edu_level": 3,
        "preferred_majors": [],
        "pick_weight": 1.0,
        "stability": 0.82,
        "health_drain": 0.8,
        "remote_capable": false,
        "flavor": "貨車、公車、計程車到電商倉儲，長時間在路上。",
        "female_weight": 0.15
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
          {
            "text": "家裡把美援麵粉袋洗淨車成短褲與內衣，左鄰右舍的孩子都穿一樣的布料。",
            "max_age": 35,
            "min_age": 4,
            "max_year": 1966
          },
          {
            "text": "巷口雜貨店響起愛國獎券開獎廣播，大人們屏息核對手中泛黃的獎券。",
            "min_age": 4
          },
          {
            "text": "母親參加鄰里的民間互助會（標會），每月省吃儉用存錢幫家裡添購腳踏車。",
            "max_age": 25,
            "requires_parents_alive": true,
            "min_age": 5
          }
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
          {
            "text": "晚飯後全家圍在客廳趕工組裝聖誕燈泡與塑膠花，電視正播著三台八點檔連續劇。",
            "min_age": 4
          },
          {
            "text": "放學與傍晚路上，街頭唱片行正播著校園民歌與台語金曲，鄰居聚在騎樓泡茶聊景氣。",
            "min_year": 1970,
            "max_year": 1986,
            "min_age": 10
          },
          {
            "text": "鄰居阿伯熱衷大家樂求明牌，巷口證券號子一早開門就擠滿看盤的菜籃族。",
            "min_year": 1985,
            "max_year": 1989,
            "min_age": 10
          },
          {
            "text": "收音機裡傳來校園民歌與《愛拚才會贏》，街頭偶爾可見解嚴後熱烈的社會運動布條。",
            "min_year": 1988,
            "max_year": 1989,
            "min_age": 10
          }
        ]
      },
      {
        "id": "cult_1990_1999",
        "year_range": [
          1990,
          1999
        ],
        "label": "民主轉型、聯考末代與呼叫器年代（1990s）",
        "family_gender_norm": "雙薪核心家庭普及，女性大專就學率快速追上男性，職場平權意識抬頭。",
        "money_culture": "1990 台股萬二崩盤後逐步重整，全民健保上路減輕醫藥負擔，民間仍偏好儲蓄與標會。",
        "social_atmosphere": "1991 終止動員戡亂、1996 首次總統直選、台北捷運通車；BB Call、漫畫王與撥接 BBS 剛起步。",
        "typical_first_marriage_age": 27,
        "overseas_comm_channel": "越洋電話、傳真與早期 BBS／電子郵件",
        "daily_vignettes": [
          {
            "text": "放學後和同學去巷口租漫畫、買十元紅茶，回家趕著看晚間卡通與綜藝節目。",
            "min_year": 1990,
            "max_year": 1999,
            "min_age": 7,
            "max_age": 17,
            "requires_student": true
          },
          {
            "text": "腰間別著呼叫器（BB Call），下班和朋友約在泡沫紅茶店或漫畫王打發時間。",
            "min_year": 1990,
            "max_year": 1999,
            "min_age": 18,
            "requires_working": true
          },
          {
            "text": "選舉前夕造勢晚會旗海飄揚，電視台與地下電台每晚熱烈辯論台灣的前途。",
            "min_year": 1990,
            "max_year": 1999,
            "min_age": 10
          }
        ]
      },
      {
        "id": "cult_2000_2009",
        "year_range": [
          2000,
          2009
        ],
        "label": "政黨輪替、網路社群萌芽與 22K 轉折（2000s）",
        "family_gender_norm": "晚婚趨勢浮現，女性高教比例追上男性，開始挑戰傳統聘金與過年回娘家習俗；2006 年離婚率達高峰。",
        "money_culture": "雙卡消費風潮與 2005 卡債危機、2008 雷曼連動債教訓，2003 SARS 後房價展開長多頭。",
        "social_atmosphere": "2000 首次政黨輪替、2007 高鐵通車；PTT、無名小站、MSN 與網咖成為青春記憶。",
        "typical_first_marriage_age": 29,
        "overseas_comm_channel": "BBS／PTT 看板、MSN 即時通與 Skype 網路電話",
        "daily_vignettes": [
          {
            "text": "放學後和同學去網咖或逛光南唱片行，回家趕著跟上無名小站相簿與 MSN 上線潮。",
            "min_year": 2000,
            "max_year": 2009,
            "min_age": 10,
            "max_age": 17,
            "requires_student": true
          },
          {
            "text": "下班或下課後掛在 BBS／PTT 與 MSN 上聊天，同學間互相幫對方的無名小站衝人氣。",
            "min_year": 2000,
            "max_year": 2009,
            "min_age": 14,
            "max_age": 35
          },
          {
            "text": "選舉前夕造勢晚會旗海飄揚，電視政論節目每晚熱烈辯論台灣的前途。",
            "min_year": 2000,
            "max_year": 2009,
            "min_age": 10
          },
          {
            "text": "房仲傳單越貼越密，身邊剛出社會的朋友開始感嘆薪水停在 22K 追不上房價。",
            "min_year": 2009,
            "max_year": 2009,
            "min_age": 21,
            "max_age": 36
          }
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
          {
            "text": "放學後和同學揪團打手遊、逛文具店買貼紙，回家討論班上最新的熱門影片。",
            "min_year": 2012,
            "min_age": 7,
            "max_age": 17,
            "requires_student": true
          },
          {
            "text": "午休時同事聚在一起滑手機看 0050 與台股大盤，手裡各拿一杯半糖去冰的手搖飲。",
            "min_age": 20,
            "requires_working": true
          },
          {
            "text": "智慧型手機與臉書剛普及，大家聚餐前習慣先幫餐點拍照打卡。",
            "min_year": 2010,
            "max_year": 2014,
            "min_age": 15
          },
          {
            "text": "家族 LINE 群組每天早上湧入長輩圖，還有親友轉傳的防詐騙提醒與旅遊照片。",
            "min_year": 2012,
            "min_age": 15
          },
          {
            "text": "身邊越來越多朋友選擇不婚不生、領養貓狗作伴，週末逛文創市集與露營。",
            "min_age": 24,
            "max_age": 50
          }
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
        "cultural_footnote_en": "Before major exams, Taiwanese families pray to Wenchang Dijun (God of Culture) with scallions (smartness) and buns/zongzi (pun for 'passing').",
        "requires_student": true
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
        "text": "清明連假返鄉掃墓祭祖，中元節街坊與公司門口擺滿澎湃供品祈求平安順遂。",
        "homesickness_boost": 6,
        "happiness_delta": 1,
        "social_delta": 2,
        "cultural_footnote_en": "During Qingming Tomb-Sweeping Day and the Seventh Lunar Month Zhongyuan Ghost Festival, Taiwanese families and workplaces set out offerings to honor ancestors and appease wandering spirits for peace and safety."
      },
      {
        "id": "cust_green_kuaikuai",
        "stage": "workplace_tech",
        "min_year": 1995,
        "age_range": [
          20,
          70
        ],
        "requires_working": true,
        "text": "公司機房伺服器與醫院、產線機台旁虔誠擺上整排效期內的「綠色奶油椰子乖乖」，祈求系統全年綠燈不出包。",
        "homesickness_boost": 4,
        "happiness_delta": 2,
        "social_delta": 1,
        "cultural_footnote_en": "Green 'Kuai Kuai' (meaning 'behave well') coconut snacks are famously placed on servers, hospital machines, and semiconductor fabs in Taiwan to prevent glitches.",
        "career_in": [
          "car_hsinchu_semi",
          "car_software_remote",
          "car_doctor_pharma",
          "car_pharma_medtech",
          "car_healthcare_ltc",
          "car_office_white_collar",
          "car_civil_teacher",
          "car_finance_broker"
        ]
      },
      {
        "id": "cust_postpartum",
        "stage": "postpartum_care",
        "age_range": [
          26,
          42
        ],
        "text": "迎接新生命後，家中細心安排「坐月子」（麻油雞補身與親友探視），成為家庭重要的育兒起點。",
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
        "name": "自費出國攻讀碩士",
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
        "desc": "在補習班苦讀英文檢定，搭配家庭資助或留學貸款赴海外深造。",
        "source_note": "自費留考廢除後最普遍的留學路徑，花費高低與家庭資源關係密切。"
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
        "cost_twd_2025": 1300000,
        "study_years": 3,
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
            "year_end": 1976,
            "title": "美國校園反戰與保釣運動",
            "summary": "越戰反戰浪潮與保釣運動撕裂海外華人社群，留學生對身分與台灣前途充滿焦慮。",
            "impact_note": "許多理工留學生選擇先在美扎根，觀望台灣局勢再決定去留。",
            "cultural_footnote_en": "The 1971 Diaoyutai movement and 1979 US-ROC diplomatic break deeply shook Taiwanese students in America; many later returned to build Taiwan's Hsinchu Science Park.",
            "sensitive": false,
            "visa_crisis_prob": 0.05,
            "happiness_delta": -5,
            "money_mult": 1.0
          },
          {
            "id": "AB_USA_1978_1980",
            "year_start": 1978,
            "year_end": 1980,
            "title": "台美斷交衝擊",
            "summary": "1978 年底美國宣布與中華民國斷交，留學生對身分與返鄉去留充滿焦慮。",
            "impact_note": "當地就業與居留環境出現變化，留外或返台的盤算更為現實。",
            "happiness_delta": -1,
            "money_mult": 1.0,
            "visa_crisis_prob": 0,
            "cultural_footnote_en": "台美斷交衝擊",
            "sensitive": false
          },
          {
            "id": "AB_USA_1985_1999",
            "year_start": 1985,
            "year_end": 1999,
            "title": "矽谷電腦產業黃金期",
            "summary": "美國個人電腦產業狂飆，理工與商管留學生畢業即獲科技大廠搶才，申請綠卡相對順遂。",
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
            "year_end": 2007,
            "title": "911 後簽證審查趨嚴",
            "summary": "2001 年 911 事件後美國大幅收緊外籍生與入境審查，簽證面談等待期拉長。",
            "impact_note": "外籍畢業生留下難度大增，部分台灣留學生提前回流亞洲金融與科技中心。",
            "cultural_footnote_en": "Post-9/11 visa vetting and the 2008 financial crisis made securing US work sponsorship far harder for Taiwanese graduates.",
            "sensitive": true,
            "visa_crisis_prob": 0.16,
            "happiness_delta": -6,
            "money_mult": 0.88
          },
          {
            "id": "AB_USA_2008_2010",
            "year_start": 2008,
            "year_end": 2010,
            "title": "華爾街金融海嘯",
            "summary": "2008 年雷曼破產引爆金融海嘯，畢業生求職凍結。",
            "impact_note": "當地就業與居留環境出現變化，留外或返台的盤算更為現實。",
            "happiness_delta": -1,
            "money_mult": 1.0,
            "visa_crisis_prob": 0.3,
            "cultural_footnote_en": "華爾街金融海嘯",
            "sensitive": false
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
            "year_end": 2021,
            "title": "疫情封城與反亞裔歧視",
            "summary": "疫情封城伴隨反亞裔仇恨事件，課程全面轉為線上。",
            "impact_note": "高薪與身分／治安風險強烈並存，讓不少旅美台灣人重新評估回台或轉往亞洲。",
            "cultural_footnote_en": "From 2020 pandemic isolation and 2022–24 tech layoffs (60-day visa grace period) to TSMC's Arizona fabs, life in the US swung dramatically.",
            "sensitive": true,
            "visa_crisis_prob": 0.18,
            "happiness_delta": -3,
            "money_mult": 1.1
          },
          {
            "id": "AB_USA_2022_2024",
            "year_start": 2022,
            "year_end": 2024,
            "title": "矽谷裁員潮",
            "summary": "科技大廠輪番裁員，工作簽證持有人面臨 60 天寬限期離境危機。",
            "impact_note": "當地就業與居留環境出現變化，留外或返台的盤算更為現實。",
            "happiness_delta": -1,
            "money_mult": 1.0,
            "visa_crisis_prob": 0.3,
            "cultural_footnote_en": "矽谷裁員潮",
            "sensitive": false
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
            "year_end": 2004,
            "title": "泡沫破滅與就職冰河期",
            "summary": "泡沫破滅後日本企業緊縮徵才進入就職冰河期，外國留學生進大手企業門檻驟升。",
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
            "year_end": 2021,
            "title": "疫情邊境管制",
            "summary": "日本邊境嚴格管制，許多留學生苦等入境。",
            "impact_note": "日圓貶值與台灣科技薪資上漲形成對比，留日逐漸由「賺高薪」轉為「追求生活品質」。",
            "cultural_footnote_en": "Historic yen depreciation in 2022–26 lowered tuition costs but narrowed Japan's wage edge over Taiwan, even as TSMC's Kumamoto fabs drew Taiwanese engineers.",
            "sensitive": false,
            "visa_crisis_prob": 0.04,
            "happiness_delta": 1,
            "money_mult": 0.88
          },
          {
            "id": "AB_JPN_2022_2026",
            "year_start": 2022,
            "year_end": 2026,
            "title": "日圓大貶與熊本設廠潮",
            "summary": "日圓走貶讓學費變親民，卻壓低薪資折合台幣的吸引力；熊本半導體聚落向台灣人才招手。",
            "impact_note": "當地就業與居留環境出現變化，留外或返台的盤算更為現實。",
            "happiness_delta": -1,
            "money_mult": 1.0,
            "visa_crisis_prob": 0,
            "cultural_footnote_en": "日圓大貶與熊本設廠潮",
            "sensitive": false
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
            "year_end": 2021,
            "title": "世紀森林大火與邊境封鎖",
            "summary": "野火籠罩東岸城市，隨後的疫情封鎖讓海外生滯留當地或遠距苦讀。",
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
            "year_end": 2015,
            "title": "取消 PSW 畢業工簽",
            "summary": "2012 年 4 月英國取消 2 年畢業生工作簽證（PSW），多數留學生畢業即被迫返台。",
            "impact_note": "政策緊縮讓這世代留英台灣人以「拿學位返台發展」為絕對大宗。",
            "cultural_footnote_en": "Abolishing the Post-Study Work visa in 2012 and the 2016 Brexit vote forced most Taiwanese UK graduates to return home immediately.",
            "sensitive": false,
            "visa_crisis_prob": 0.35,
            "happiness_delta": -5,
            "money_mult": 0.9
          },
          {
            "id": "AB_GBR_2016_2019",
            "year_start": 2016,
            "year_end": 2019,
            "title": "英國脫歐公投",
            "summary": "2016 脫歐公投引發英鎊重貶與歐洲流動受阻。",
            "impact_note": "當地就業與居留環境出現變化，留外或返台的盤算更為現實。",
            "happiness_delta": -1,
            "money_mult": 1.0,
            "visa_crisis_prob": 0.1,
            "cultural_footnote_en": "英國脫歐公投",
            "sensitive": false
          },
          {
            "id": "AB_GBR_2021_2026",
            "year_start": 2021,
            "year_end": 2022,
            "title": "重啟 2 年畢業生簽證",
            "summary": "英國重啟 Graduate Route 2 年工簽，吸引台灣留學潮回溫。",
            "impact_note": "兩年緩衝期雖好找實習，但轉長期贊助工作簽證的門檻再次變高。",
            "cultural_footnote_en": "The 2021 Graduate Route reopened UK careers, though inflation, long NHS waits, and steeper 2024 Skilled Worker salary thresholds tested newcomers.",
            "sensitive": false,
            "visa_crisis_prob": 0.2,
            "happiness_delta": -2,
            "money_mult": 0.96
          },
          {
            "id": "AB_GBR_2023_2026",
            "year_start": 2024,
            "year_end": 2026,
            "title": "高通膨與工簽門檻提高",
            "summary": "生活費高漲、看診排隊漫長，技術工簽年薪門檻大幅拉高。",
            "impact_note": "當地就業與居留環境出現變化，留外或返台的盤算更為現實。",
            "happiness_delta": -1,
            "money_mult": 1.0,
            "visa_crisis_prob": 0.25,
            "cultural_footnote_en": "高通膨與工簽門檻提高",
            "sensitive": false
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
            "year_end": 2024,
            "title": "房價失控與國際學生配額縮減",
            "summary": "溫哥華與多倫多房租高漲、家庭醫師一號難求，聯邦政府開始收緊國際學生配額。",
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
            "year_end": 1992,
            "title": "歐洲公費拓荒與冷戰尾聲",
            "summary": "台灣增設歐洲公費名額，留德學生見證歐洲劇變的年代。",
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
            "year_end": 2019,
            "title": "英語碩士免學費潮",
            "summary": "德國公立大學免學費與 18 個月求職簽證吸引台灣理工與設計系精打細算深造。",
            "impact_note": "德語門檻與冬日漫長陰暗是留德台灣人最常面對的適應關卡。",
            "cultural_footnote_en": "Tuition-free German public universities and an 18-month job-seeker visa made Germany a top value destination for Taiwanese STEM and design students.",
            "sensitive": false,
            "visa_crisis_prob": 0.08,
            "happiness_delta": 2,
            "money_mult": 1.02
          },
          {
            "id": "AB_DEU_2022_2024",
            "year_start": 2022,
            "year_end": 2024,
            "title": "俄烏戰爭與能源通膨",
            "summary": "俄烏戰爭後能源價格飆升，但工作生活平衡與年假制度仍深具魅力。",
            "impact_note": "當地就業與居留環境出現變化，留外或返台的盤算更為現實。",
            "happiness_delta": -1,
            "money_mult": 1.0,
            "visa_crisis_prob": 0,
            "cultural_footnote_en": "俄烏戰爭與能源通膨",
            "sensitive": false
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
        "title": "成家與生兒育女的考量：海外高昂托育 vs 回台後援",
        "desc": "步入婚姻後開始規劃是否生育下一代，但海外托育費天價又缺乏親友照應，讓你認真考慮回台灣建立家庭與坐月子後援。",
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
          },
          "era_labels": [
            {
              "max_year": 1994,
              "label": "打包返台發展（海歸學人待遇與家人陪伴）"
            },
            {
              "min_year": 1995,
              "label": "打包返台發展（海歸線：享海歸加給、健保與家人陪伴）"
            }
          ]
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
          "min_year": 1950,
          "max_year": 1967,
          "name": "初中／初職聯考",
          "age": 12,
          "level": "junior",
          "top_threshold": 68,
          "hs_threshold": 44
        },
        {
          "min_year": 1950,
          "max_year": 2000,
          "name": "高中聯考（北聯／中聯／南聯）",
          "age": 15,
          "top_threshold": 70,
          "hs_threshold": 52
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
            "label": "上課後補習班狂寫評量（知識++、升學考加分、幸福-）",
            "effects": {
              "knowledge": 11,
              "happiness": -5,
              "health": -3,
              "flag_set": "childhood_cram",
              "hs_exam_bonus": 7
            },
            "era_labels": [
              {
                "max_year": 1989,
                "label": "放學留校補習或去文理補習班狂寫參考書（知識++、升學加分、幸福-）"
              },
              {
                "min_year": 1990,
                "label": "上安親班／文理補習班狂寫評量（知識++、升學考加分、幸福-）"
              }
            ]
          },
          {
            "key": "sports_arts",
            "label": "參加學校校隊／音樂美術才藝班（健康+、人際+、幸福+）",
            "effects": {
              "health": 7,
              "social": 8,
              "happiness": 6,
              "knowledge": 3,
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
              "flag_set": "childhood_family_help"
            }
          }
        ]
      },
      {
        "id": "LS02A_primary_exam",
        "stage": "primary_exam",
        "title": "國小畢業：初中聯考放榜",
        "conditions": {
          "special": "junior_exam_year",
          "in_taiwan_only": true
        },
        "desc": "動態生成（1968 年九年國教前，國小畢業須考初中）",
        "options": [
          {
            "key": "enter_junior",
            "label": "考上初中，繼續升學",
            "requires_exam_tier": "normal_hs_or_above",
            "effects": {
              "track": "junior",
              "knowledge": 5
            }
          },
          {
            "key": "enter_junior_voc",
            "label": "就讀初級職業學校（初職），學一點農工商技能",
            "effects": {
              "track": "junior_voc",
              "knowledge": 3
            }
          },
          {
            "key": "stop_after_primary",
            "label": "國小畢業就去當學徒或在家幫忙農事",
            "effects": {
              "track": "primary_labor",
              "knowledge": -3,
              "hs_tier": "work_early"
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
            "label": "就讀高職或五專（學一技之長、考證照或後續升學）",
            "effects": {
              "track": "vocational",
              "knowledge": 4,
              "hs_tier": "vocational"
            },
            "era_labels": [
              {
                "max_year": 1964,
                "label": "就讀高職（學一技之長、日後就業）"
              },
              {
                "min_year": 1965,
                "max_year": 1996,
                "label": "就讀高職或五專（學一技之長、考證照或日後拚二專／插大）"
              },
              {
                "min_year": 1997,
                "max_year": 2000,
                "label": "就讀高職或五專（學一技之長、考證照或日後升二技／科大）"
              },
              {
                "min_year": 2001,
                "label": "就讀高職或五專（學一技之長、考證照或日後拚統測升科大）"
              }
            ]
          },
          {
            "key": "stop_schooling",
            "label": "不繼續升學，直接進工廠／店面當學徒賺錢貼補家用",
            "effects": {
              "track": "labor",
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
            },
            "requires_stats": {
              "knowledge": 50
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
        "title": "高職／五專校園抉擇：拚證照競賽、建教實習還是繼續升學？",
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
            "label": "苦練專業技能、考取乙級技術士證照與全國技藝競賽（技能起薪++、保送升學）",
            "requires_knowledge_min": 45,
            "effects": {
              "knowledge": 8,
              "wage_mult": 1.06,
              "flag_set": "vocational_elite",
              "uni_admit_bonus": 0.25
            },
            "era_labels": [
              {
                "max_year": 1996,
                "label": "苦練專業技能、考取乙級技術士證照與全國技藝競賽（起薪++、保送技術學院）"
              },
              {
                "min_year": 1997,
                "label": "苦練專業技能、考取乙級技術士證照與全國技藝競賽（起薪++、保送國立科大）"
              }
            ]
          },
          {
            "key": "coop_internship",
            "label": "參加建教合作／提前進工廠與企業實習（存錢快、畢業直接轉正）",
            "effects": {
              "money_delta_twd_2025": 90000,
              "social": 5,
              "health": -3,
              "wage_mult": 1.03,
              "flag_set": "vocational_coop"
            }
          },
          {
            "key": "aim_tech_uni",
            "label": "報名補習班專攻升學考試，目標考上國立技職院校",
            "effects": {
              "knowledge": 9,
              "happiness": -4,
              "uni_admit_bonus": 0.18
            },
            "era_labels": [
              {
                "max_year": 1996,
                "label": "報名補習班專攻二專／插大考試，目標考上國立技術學院或大學"
              },
              {
                "min_year": 1997,
                "max_year": 2000,
                "label": "報名補習班專攻二技／插大，目標考上國立科技大學"
              },
              {
                "min_year": 2001,
                "label": "報名補習班專攻統測／插大，目標考上國立科技大學"
              }
            ],
            "requires_stats": {
              "knowledge": 45
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
              "wage_mult": 1.12,
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
            },
            "era_labels": [
              {
                "max_year": 1985,
                "label": "白天工作、晚上念補校或夜間部補完高中職學歷（解除學歷上限！）"
              },
              {
                "min_year": 1986,
                "label": "白天工作、晚上念夜校／空中大學補學歷（解除學歷上限！）"
              }
            ]
          },
          {
            "key": "casual_jobs",
            "label": "換過幾份餐飲與超商打工，維持自由生活步調",
            "era_labels": [
              {
                "max_year": 1978,
                "label": "換過幾份工廠臨工、餐飲與雜貨店打雜，維持自由生活步調"
              },
              {
                "min_year": 1979,
                "label": "換過幾份餐飲與超商打工，維持自由生活步調"
              }
            ],
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
              "wage_mult": 1.03
            },
            "era_labels": [
              {
                "max_year": 1993,
                "label": "跟著教授做研究／衝書卷獎（知識++、考研究所與留學獎學金大加分）"
              },
              {
                "min_year": 1994,
                "label": "大二就進教授實驗室做專題／衝書卷獎（知識++、推甄頂大與留學獎學金大加分）"
              }
            ]
          },
          {
            "key": "parttime_tutor",
            "label": "狂接家教與校外打工存生活費（累積存款、減輕學貸、提早社會化）",
            "effects": {
              "money_delta_twd_2025": 120000,
              "social": 5,
              "health": -4,
              "flag_set": "uni_parttime"
            },
            "requires_stats": {
              "knowledge": 55
            }
          },
          {
            "key": "double_major_coding",
            "label": "跨領域修習第二專長（知識+、提升職場轉型與高薪彈性）",
            "effects": {
              "knowledge": 11,
              "happiness": -4,
              "flag_set": "uni_cross_coding",
              "remote_unlock": true,
              "wage_mult": 1.04
            },
            "era_labels": [
              {
                "max_year": 1979,
                "label": "跨系旁聽外語、商管或工程實務課程（知識+、強化職場競爭力）"
              },
              {
                "min_year": 1980,
                "max_year": 2004,
                "label": "雙主修／輔系或自學電腦程式跨領域（知識+、開啟科技業職涯資格）"
              },
              {
                "min_year": 2005,
                "label": "雙主修／輔系或自學程式跨領域（知識+、解鎖科技軟體與遠距職涯資格）"
              }
            ]
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
              "wage_mult": 1.05,
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
            ],
            "requires_stats": {
              "knowledge": 55
            }
          },
          {
            "key": "prep_civil_exam",
            "label": "提早報名補習班備考公職／國營／國家專技證照（知識+、日後公職上榜率翻倍！）",
            "effects": {
              "knowledge": 10,
              "happiness": -6,
              "social": -4,
              "money_delta_twd_2025": -18000,
              "flag_set": "uni_civil_prep"
            }
          },
          {
            "key": "prep_grad_abroad",
            "label": "狂刷歷屆考研／外語留學考試衝刺（大幅提升頂大碩士與出國留學契機）",
            "effects": {
              "knowledge": 12,
              "happiness": -5,
              "flag_set": "uni_grad_abroad_prep"
            },
            "era_labels": [
              {
                "max_year": 1989,
                "label": "狂刷歷屆考研／托福 GRE 衝刺（大幅提升國內頂大碩士與出國留學契機）"
              },
              {
                "min_year": 1990,
                "label": "狂刷歷屆考研／托福 GRE 雅思衝刺（大幅提升國內頂大碩士與出國留學契機）"
              }
            ],
            "requires_stats": {
              "knowledge": 60
            }
          },
          {
            "key": "grad_travel_youth",
            "label": "趁年輕環島旅行與畢業出遊（幸福++、健康+、留下難忘青春）",
            "effects": {
              "happiness": 12,
              "health": 5,
              "social": 6,
              "money_delta_twd_2025": -15000
            },
            "era_labels": [
              {
                "max_year": 2007,
                "label": "趁年輕搭火車／騎機車環島與畢業旅行（幸福++、健康+、留下難忘青春）"
              },
              {
                "min_year": 2008,
                "label": "趁年輕機車環島、打工換宿與畢業旅行（幸福++、健康+、留下難忘青春）"
              }
            ]
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
          "in_taiwan_only": true,
          "career_not_in": [
            "car_civil_teacher",
            "car_farmer_fisher",
            "car_doctor_pharma",
            "car_lawyer_cpa",
            "car_cpa"
          ]
        },
        "desc": "出社會打滾幾年後進入第一個職涯高原期。你過往累積的屬性、社團人脈或大學備考基礎，此刻都能派上用場。",
        "options": [
          {
            "key": "network_referral",
            "label": "動用大學社團／同業人脈內推跳槽外商或大廠（需人際 ≥ 68 或曾任社團幹部）",
            "requires_social_or_club": true,
            "effects": {
              "wage_mult": 1.1,
              "social": 5,
              "happiness": 6,
              "flag_set": "referral_promoted"
            },
            "era_labels": [
              {
                "max_year": 1999,
                "label": "靠同學同業人脈介紹跳槽更好的公司（需人際 ≥ 68 或曾任社團幹部）"
              },
              {
                "min_year": 2000,
                "label": "動用大學社團／同業人脈內推跳槽外商或大廠（需人際 ≥ 68 或曾任社團幹部）"
              }
            ]
          },
          {
            "key": "exec_cert_study",
            "label": "利用下班進修專業證照／在職專班（依知識值檢定升遷加薪機率）",
            "effects": {
              "knowledge": 8,
              "health": -4,
              "money_delta_twd_2025": -120000,
              "check_knowledge_promotion": true
            },
            "era_labels": [
              {
                "max_year": 1998,
                "label": "利用下班到夜間部或補習班進修、報考專業證照（依知識值檢定升遷加薪機率）"
              },
              {
                "min_year": 1999,
                "label": "利用下班進修專業證照／在職專班（依知識值檢定升遷加薪機率）"
              }
            ],
            "requires_stats": {
              "knowledge": 45
            }
          },
          {
            "key": "switch_civil_service",
            "label": "趁還有體力報考高普考／國營事業（須高中職以上；大學曾備考或知識高者較易上榜）",
            "effects": {
              "attempt_instant_civil_exam": true
            },
            "requires_edu_min": 3
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
              "wage_mult": 1.05,
              "health": -5,
              "money_delta_twd_2025": -150000
            },
            "requires_stats": {
              "social": 55
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
            },
            "requires_stats": {
              "health": 35
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
        "title": "退休後的第三人生：樂齡進修、幫忙帶孫還是環台慢活？",
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
            "label": "報名樂齡學苑並當志工（人際++、健康+、對抗孤老）",
            "effects": {
              "social": 12,
              "happiness": 10,
              "health": 8,
              "knowledge": 5,
              "midlife_mortality_mult": 0.85
            },
            "era_labels": [
              {
                "max_year": 1997,
                "label": "報名長青學苑學書法攝影並擔任志工（人際++、健康+、對抗孤老）"
              },
              {
                "min_year": 1998,
                "label": "報名台灣社區大學／樂齡中心學書法攝影並當志工（人際++、健康+、對抗孤老）"
              }
            ]
          },
          {
            "key": "help_grandkids",
            "label": "幫忙子女接送照顧孫子（僅有子女者可選：親情++、體力消耗）",
            "requires_children": true,
            "effects": {
              "social": 10,
              "happiness": 8,
              "health": -5
            },
            "requires_adult_children": true,
            "requires_stats": {
              "health": 35
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
        "price_pct": 0.319,
        "max_drawdown": -0.236,
        "housing_pct": 0.01,
        "note": "AI 超級週期推動 10 月盤中逼近 5 萬點（49,968.92），截至 11 月底暫估上漲約 31.9%（高點回撤 -23.6%）"
      }
    }
  },
  "ambientPeers": {
    "meta": {
      "schema_version": "1.0.0",
      "description": "參照 1in8b.life 設計之『周圍人的時代側影』微故事庫（1950–2080s），以身邊同學、親友與鄰居的切片映照各年代台灣社會結構與日常人情。（v6.8 起加入「周圍的人與事」：好友、親戚、鄰里與城市變化的敘事事件；category 為 friend／relative／place，memory 標籤會在日後相關抉擇中被想起。）"
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
          1968,
          1976
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
          14
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
        "historical_note": "台灣大專校院工程類科女性比例長期偏低（不足 10%），性別刻板分工深刻左右升學與職涯選擇。",
        "min_edu_level": 3,
        "requires_hs": true
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
        "min_edu_level": 3,
        "relation": "高中同桌",
        "text": "大學聯考放榜那天，你平時成績很好的同桌差了兩分沒上理想志願。隔週他把厚厚的參考書裝進書包去重考班報到，接下來一整年，同學聚會都沒有人見過他。",
        "historical_note": "大學聯考窄門時期錄取率僅約三至四成，「重考一年」是無數青年的共同青春記憶。"
      },
      {
        "id": "AP_1994_island_military",
        "year_range": [
          1985,
          2003
        ],
        "age_range": [
          20,
          26
        ],
        "min_edu_level": 4,
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
        "requires_working": true,
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
        "requires_working": true,
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
        "min_edu_level": 4,
        "relation": "大學室友",
        "text": "大學室友畢業後投了六十封履歷，最後領著剛好兩萬二的起薪，在台北租了一間沒對外窗的頂樓加蓋。他在 MSN 上苦笑說，扣完房租和學貸，連感冒都不敢請病假。",
        "historical_note": "2009 年金融海嘯期間台灣失業率達 5.85%，企業實習 22K 方案意外形成青年起薪定錨效應。"
      },
      {
        "id": "AP_2017_australia_friend",
        "year_range": [
          2011,
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
        "requires_flag": "migrated_north",
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
        "text": "相伴十年的多年好友終於和伴侶去戶政事務所登記結婚了。婚宴只請了幾桌最親近的親友，交換誓詞時，你看見她原本沉默反對多年的父親偷偷拭去眼角的淚。",
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
        "historical_note": "",
        "min_edu_level": 4
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
        "requires_working": true,
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
      },
      {
        "id": "SW_friend_emigrates_lonely",
        "year_range": [
          1965,
          2100
        ],
        "age_range": [
          18,
          45
        ],
        "relation": "從小一起長大的好友",
        "category": "friend",
        "text": "好友決定出國了。送機那天你們在機場吃了最後一頓飯，他說會常寫信、常打電話。回家的路上，你突然覺得這座城市空了一塊。",
        "memory": "friend_left_lonely",
        "memory_echo": "好友出國後，你們的聯絡一年比一年少"
      },
      {
        "id": "SW_friend_abroad_thriving",
        "year_range": [
          1975,
          2100
        ],
        "age_range": [
          25,
          50
        ],
        "relation": "出國多年的老同學",
        "category": "friend",
        "text": "多年前出國的老同學回台探親，請大家吃飯。他說在國外升了主管、買了房子，孩子講英文比中文流利。散場時他拍拍你的肩：「有機會就出去看看吧。」",
        "memory": "friend_abroad_thriving",
        "memory_echo": "老同學在國外過得很好，還勸你有機會就出去看看"
      },
      {
        "id": "SW_friend_startup_success",
        "year_range": [
          1975,
          2100
        ],
        "age_range": [
          26,
          50
        ],
        "relation": "大學室友",
        "category": "friend",
        "text": "大學室友當年辭職創業，大家都說他瘋了。今年他的公司被大企業收購，他在同學會上請了全場的酒。你看著他，心裡有點不是滋味，也有點佩服。",
        "memory": "friend_startup_success",
        "memory_echo": "大學室友辭職創業，最後成功了"
      },
      {
        "id": "SW_friend_startup_fail",
        "year_range": [
          1975,
          2100
        ],
        "age_range": [
          26,
          55
        ],
        "relation": "以前的同事",
        "category": "friend",
        "text": "以前的同事拿房子抵押去開店，撐了兩年還是收了。他現在白天跑外送、晚上兼差還債，見到你時笑得很勉強：「創業啊，十個有九個死。」",
        "memory": "friend_startup_fail",
        "memory_echo": "同事抵押房子創業失敗，至今還在還債"
      },
      {
        "id": "SW_friend_burnout",
        "year_range": [
          1996,
          2100
        ],
        "age_range": [
          28,
          50
        ],
        "relation": "高中死黨",
        "category": "friend",
        "text": "高中死黨在科技廠連續加班好幾個月，某天早上在捷運上昏倒，送醫才知道是過勞。他在病床上說：「賺那麼多，最後都拿來付醫藥費。」",
        "memory": "friend_burnout",
        "memory_echo": "高中死黨過勞倒下，躺在病床上說錢都拿去付醫藥費"
      },
      {
        "id": "SW_friend_divorce",
        "year_range": [
          1985,
          2100
        ],
        "age_range": [
          30,
          55
        ],
        "relation": "大學好友",
        "category": "friend",
        "text": "大學好友離婚了。她說兩個人早就沒話聊，為了孩子撐了好幾年。簽完字的那天，她約你喝咖啡，說這是她十年來第一次覺得自己可以呼吸。",
        "memory": "friend_divorced",
        "memory_echo": "好友離婚後說，那是她十年來第一次覺得可以呼吸"
      },
      {
        "id": "SW_friend_scammed",
        "year_range": [
          2010,
          2100
        ],
        "age_range": [
          25,
          75
        ],
        "relation": "認識很久的朋友",
        "category": "friend",
        "text": "認識很久的朋友被網路上的投資群組騙了，把退休金和信貸全投進去，最後群組解散、客服消失。他到現在都不敢跟家人說。",
        "memory": "friend_scammed",
        "memory_echo": "朋友被投資詐騙騙光了退休金"
      },
      {
        "id": "SW_friend_rich_stocks",
        "year_range": [
          1986,
          2100
        ],
        "age_range": [
          25,
          65
        ],
        "relation": "同事",
        "category": "friend",
        "text": "同事這幾年買股票賺了不少，換了新車，午餐時總在聊他又抓到哪一支飆股。你偷偷打開自己的存款簿，覺得錢放在銀行好像有點笨。",
        "memory": "friend_rich_from_stocks",
        "memory_echo": "同事靠買股票換了新車"
      },
      {
        "id": "SW_friend_happy_parent",
        "year_range": [
          1980,
          2100
        ],
        "age_range": [
          27,
          42
        ],
        "relation": "最好的朋友",
        "category": "friend",
        "text": "最好的朋友當媽媽了。你去看她的時候，她累得黑眼圈很重，但抱著孩子笑得很滿足：「以前覺得生小孩很可怕，現在覺得是我做過最好的決定。」",
        "memory": "friend_happy_parent",
        "memory_echo": "最好的朋友說，生小孩是她做過最好的決定"
      },
      {
        "id": "SW_friend_childfree",
        "year_range": [
          1995,
          2100
        ],
        "age_range": [
          28,
          45
        ],
        "relation": "大學同學",
        "category": "friend",
        "text": "大學同學和另一半決定不生小孩，週末到處旅行、養了兩隻貓。家族聚會時長輩一直唸，他們只是笑笑說：「我們過得很好。」",
        "memory": "friend_childfree_happy",
        "memory_echo": "同學夫妻決定不生，說他們過得很好"
      },
      {
        "id": "SW_friend_returned_home",
        "year_range": [
          2008,
          2100
        ],
        "age_range": [
          30,
          50
        ],
        "relation": "在台北工作的同鄉",
        "category": "friend",
        "text": "同鄉在台北工作了十年，今年辭職回老家接手家裡的果園。他在臉書上貼了一張夕陽下的果園照片，寫著：「終於不用擠捷運了。」",
        "memory": "friend_returned_home",
        "memory_echo": "同鄉辭職回老家接手果園，說終於不用擠捷運"
      },
      {
        "id": "SW_friend_military_bond",
        "year_range": [
          1960,
          2010
        ],
        "age_range": [
          20,
          23
        ],
        "relation": "同梯的弟兄",
        "category": "friend",
        "text": "退伍前的最後一晚，同梯的弟兄在寢室偷偷開了一瓶米酒，約好以後每年都要聚一次。你們都知道，大部分的約定會慢慢淡掉。",
        "sex": "M"
      },
      {
        "id": "SW_friend_classmate_reunion",
        "year_range": [
          1970,
          2100
        ],
        "age_range": [
          38,
          60
        ],
        "relation": "國中同學",
        "category": "friend",
        "text": "睽違二十年的國中同學會。有人當了老闆，有人離了兩次婚，有人已經不在了。班長點名到一半停了下來，大家安靜了好一會兒。"
      },
      {
        "id": "SW_friend_lost_contact",
        "year_range": [
          1960,
          2100
        ],
        "age_range": [
          40,
          70
        ],
        "relation": "年輕時的摯友",
        "category": "friend",
        "text": "整理舊東西時翻到年輕時摯友寫給你的信。你試著找他的電話，才發現已經二十年沒有聯絡了。"
      },
      {
        "id": "SW_relative_died_young",
        "year_range": [
          1955,
          2100
        ],
        "age_range": [
          16,
          60
        ],
        "relation": "表哥",
        "category": "relative",
        "text": "表哥才四十出頭，在工地突然倒下就再也沒醒來。告別式上舅媽哭到站不起來，你看著照片裡他笑得那麼開心，第一次認真想：人生到底什麼最重要？",
        "memory": "relative_died_young",
        "memory_echo": "表哥四十出頭就突然走了"
      },
      {
        "id": "SW_relative_cancer",
        "year_range": [
          1970,
          2100
        ],
        "age_range": [
          20,
          70
        ],
        "relation": "阿姨",
        "category": "relative",
        "text": "阿姨確診癌症第三期。她說年輕時省吃儉用，一次都沒出國玩過，現在想去也走不動了。病房裡她握著你的手：「錢再賺就有，身體只有一個。」",
        "memory": "relative_cancer_regret",
        "memory_echo": "阿姨生病後說，錢再賺就有，身體只有一個"
      },
      {
        "id": "SW_relative_rosca_collapse",
        "year_range": [
          1955,
          1995
        ],
        "age_range": [
          15,
          60
        ],
        "relation": "嬸嬸",
        "category": "relative",
        "text": "嬸嬸跟了好幾個會，會頭突然跑路，存了十幾年的錢一夕之間沒了。她在客廳哭了一整晚，叔叔一句話也沒說。",
        "memory": "relative_rosca_collapse",
        "memory_echo": "嬸嬸跟會被倒，十幾年的積蓄一夕歸零"
      },
      {
        "id": "SW_relative_cousin_success",
        "year_range": [
          1975,
          2100
        ],
        "age_range": [
          20,
          45
        ],
        "relation": "堂弟",
        "category": "relative",
        "text": "堂弟考上了台大醫科。過年時長輩們圍著他問東問西，又轉頭問你：「那你現在在做什麼？」你笑著回答，心裡有點悶。"
      },
      {
        "id": "SW_relative_uncle_bankrupt",
        "year_range": [
          1970,
          2100
        ],
        "age_range": [
          15,
          55
        ],
        "relation": "舅舅",
        "category": "relative",
        "text": "舅舅替朋友作保，朋友跑了，銀行來查封舅舅的房子。媽媽說，以後誰來借錢都不要作保，親兄弟也一樣。",
        "memory": "relative_guarantor_ruin",
        "memory_echo": "舅舅替人作保，最後房子被查封"
      },
      {
        "id": "SW_relative_inheritance_feud",
        "year_range": [
          1980,
          2100
        ],
        "age_range": [
          30,
          70
        ],
        "relation": "父親那邊的親戚",
        "category": "relative",
        "text": "爺爺留下的老房子，讓幾個伯伯叔叔吵到上法院。小時候一起過年的堂兄弟，現在在路上遇到都不打招呼了。",
        "memory": "relative_inheritance_feud",
        "memory_echo": "伯伯叔叔為了老房子吵上法院"
      },
      {
        "id": "SW_relative_caregiver_burnout",
        "year_range": [
          1990,
          2100
        ],
        "age_range": [
          30,
          65
        ],
        "relation": "姑姑",
        "category": "relative",
        "text": "姑姑辭掉工作照顧中風的奶奶七年，自己也累出一身病。她說最後悔的，是當初沒有早點請人幫忙、跟兄弟姊妹分擔。",
        "memory": "relative_caregiver_burnout",
        "memory_echo": "姑姑獨自照顧奶奶七年，累出一身病"
      },
      {
        "id": "SW_relative_aunt_emigrated",
        "year_range": [
          1970,
          2010
        ],
        "age_range": [
          10,
          40
        ],
        "relation": "移民美國的姑姑",
        "category": "relative",
        "text": "移民美國的姑姑寄來一個大包裹，裡面有巧克力、維他命和一件印著大學名字的運動衫。你把運動衫穿去學校，同學都很羨慕。"
      },
      {
        "id": "SW_relative_cousin_wedding",
        "year_range": [
          1960,
          2100
        ],
        "age_range": [
          18,
          40
        ],
        "relation": "表姊",
        "category": "relative",
        "text": "表姊結婚了，喜宴辦了五十桌。親戚們在桌上輪流問你：「什麼時候換你？」你低頭吃菜，假裝沒聽到。"
      },
      {
        "id": "SW_relative_grandparent_passing",
        "year_range": [
          1955,
          2100
        ],
        "age_range": [
          8,
          40
        ],
        "relation": "阿公",
        "category": "relative",
        "text": "阿公走了。出殯那天，三合院前搭起了棚子，你第一次看到爸爸哭。晚上整理遺物時，你在阿公的抽屜裡找到一張你小時候的照片。"
      },
      {
        "id": "SW_place_first_711",
        "year_range": [
          1979,
          1992
        ],
        "age_range": [
          6,
          50
        ],
        "relation": "巷口",
        "category": "place",
        "text": "巷口開了第一家便利商店，二十四小時都亮著燈。大家半夜也能買到茶葉蛋和泡麵，雜貨店的老闆娘說生意差了好多。",
        "historical_note": "1979 年台灣第一家 7-ELEVEN 在台北開幕，1980 年代後便利商店快速普及。"
      },
      {
        "id": "SW_place_mall_opens",
        "year_range": [
          1990,
          2100
        ],
        "age_range": [
          8,
          70
        ],
        "relation": "家附近",
        "category": "place",
        "text": "家附近新的購物商場落成了，週末停車場排滿了車，連帶周邊開了好多新餐廳。房仲傳單塞滿了信箱，說附近的房價要漲了。",
        "memory": "neighborhood_boom",
        "memory_echo": "家附近蓋了大商場，整個區域熱鬧起來"
      },
      {
        "id": "SW_place_mrt_opens",
        "year_range": [
          1996,
          2100
        ],
        "age_range": [
          10,
          75
        ],
        "relation": "家附近",
        "category": "place",
        "text": "捷運新路線通車了，站就在離家走路五分鐘的地方。通車那天大家排隊試搭，阿嬤說她活到這把年紀，第一次坐不用開窗的車。",
        "historical_note": "台北捷運木柵線 1996 年通車，之後高雄、桃園、台中陸續有捷運。",
        "memory": "neighborhood_boom",
        "memory_echo": "捷運通到家門口，附近越來越熱鬧",
        "regions": [
          "north_taipei",
          "south_kaohsiung",
          "north_hsinchu",
          "central"
        ]
      },
      {
        "id": "SW_place_factory_closes",
        "year_range": [
          1988,
          2015
        ],
        "age_range": [
          10,
          60
        ],
        "relation": "鎮上",
        "category": "place",
        "text": "鎮上最大的工廠搬去大陸了，好幾百人失業。原本熱鬧的工廠門口，現在只剩一排拉下鐵門的小吃店。",
        "memory": "town_declining",
        "memory_echo": "鎮上的大工廠搬走了，街上越來越冷清"
      },
      {
        "id": "SW_place_school_closes",
        "year_range": [
          2005,
          2100
        ],
        "age_range": [
          10,
          80
        ],
        "relation": "老家附近",
        "category": "place",
        "text": "你念過的國小因為學生太少，明年要併校了。校門口那棵老榕樹還在，但操場上只剩幾個孩子在玩。",
        "memory": "town_declining",
        "memory_echo": "你念過的國小因為少子化要併校了",
        "regions": [
          "east_islands",
          "south_tainan",
          "central",
          "south_kaohsiung"
        ]
      },
      {
        "id": "SW_place_night_market",
        "year_range": [
          1960,
          2100
        ],
        "age_range": [
          8,
          60
        ],
        "relation": "附近",
        "category": "place",
        "text": "附近空地每週二晚上變成夜市，攤販從傍晚開始搭棚子。烤香腸、射氣球、撈金魚，整條街都是人的聲音和食物的味道。"
      },
      {
        "id": "SW_place_temple_festival",
        "year_range": [
          1950,
          2100
        ],
        "age_range": [
          6,
          80
        ],
        "relation": "廟口",
        "category": "place",
        "text": "廟口的媽祖遶境經過家門口，鞭炮聲從早響到晚。鄰居家門口都擺了供桌，小孩子跟著陣頭跑了好幾條街。"
      },
      {
        "id": "SW_place_urban_renewal",
        "year_range": [
          2000,
          2100
        ],
        "age_range": [
          20,
          80
        ],
        "relation": "住的社區",
        "category": "place",
        "text": "社區的老公寓談了十年的都更終於成功了。有人分到兩戶，有人堅持不簽被罵釘子戶。拆房子那天，好幾個老鄰居站在對街看了很久。",
        "regions": [
          "north_taipei",
          "central",
          "south_kaohsiung",
          "north_hsinchu"
        ]
      },
      {
        "id": "SW_place_highway",
        "year_range": [
          1978,
          2015
        ],
        "age_range": [
          10,
          60
        ],
        "relation": "老家",
        "category": "place",
        "text": "新的高速公路交流道就蓋在老家附近，以前去台北要五個小時，現在不用三個小時。叔叔說，田地的價格一夕之間翻了好幾倍。",
        "memory": "neighborhood_boom",
        "memory_echo": "交流道蓋到老家附近，地價一夕翻漲"
      },
      {
        "id": "SW_place_typhoon_blackout",
        "year_range": [
          1960,
          2100
        ],
        "age_range": [
          6,
          80
        ],
        "relation": "整條街",
        "category": "place",
        "text": "颱風過後停電三天，整條街的人搬椅子到騎樓乘涼，大人聊天、小孩玩撲克牌。那幾天鄰居們講的話，比一整年加起來還多。"
      },
      {
        "id": "SW_place_old_shop_closes",
        "year_range": [
          1995,
          2100
        ],
        "age_range": [
          15,
          80
        ],
        "relation": "巷口",
        "category": "place",
        "text": "巷口開了四十年的柑仔店收了。老闆說年紀大了，孩子也不想接。最後一天，很多人特地回來買一包糖果，跟老闆合照。"
      },
      {
        "id": "SW_place_new_immigrant_shop",
        "year_range": [
          2005,
          2100
        ],
        "age_range": [
          15,
          80
        ],
        "relation": "街角",
        "category": "place",
        "text": "街角開了一家越南河粉店，老闆娘是十幾年前嫁來台灣的新住民。湯頭很香，現在每到中午都要排隊。"
      },
      {
        "id": "SW_place_science_park",
        "year_range": [
          1985,
          2100
        ],
        "age_range": [
          15,
          60
        ],
        "relation": "鄰近的鄉鎮",
        "category": "place",
        "text": "鄰近的鄉鎮要蓋科學園區了。附近的房子一間間改建成套房，路上多了好多掛著識別證的年輕工程師。",
        "memory": "neighborhood_boom",
        "memory_echo": "附近蓋了科學園區，房價和租金一路漲",
        "regions": [
          "north_hsinchu",
          "central",
          "south_tainan",
          "south_kaohsiung"
        ]
      },
      {
        "id": "SW_place_empty_houses",
        "year_range": [
          2030,
          2120
        ],
        "age_range": [
          20,
          90
        ],
        "relation": "老家的村子",
        "category": "place",
        "text": "老家的村子越來越安靜，半數的房子空著，路燈壞了也沒人修。只有過年的時候，才會停滿外地回來的車。",
        "memory": "town_declining",
        "memory_echo": "老家的村子有一半的房子空著",
        "regions": [
          "east_islands",
          "south_tainan",
          "central",
          "south_kaohsiung"
        ]
      },
      {
        "id": "SW_place_ev_charging",
        "year_range": [
          2028,
          2120
        ],
        "age_range": [
          18,
          80
        ],
        "relation": "社區",
        "category": "place",
        "text": "社區地下室裝滿了充電樁，加油站改成了咖啡店。管委會為了充電費怎麼分攤，開了三次會還吵不完。"
      },
      {
        "id": "SW_place_drone_delivery",
        "year_range": [
          2035,
          2120
        ],
        "age_range": [
          10,
          90
        ],
        "relation": "陽台",
        "category": "place",
        "text": "無人機送貨開始在你住的區域試辦，陽台多了一個降落架。第一次看到包裹從天上慢慢降下來，鄰居的小孩興奮地尖叫。"
      },
      {
        "id": "SW_place_heat_shelter",
        "year_range": [
          2030,
          2120
        ],
        "age_range": [
          10,
          90
        ],
        "relation": "里民活動中心",
        "category": "place",
        "text": "夏天熱到受不了，里民活動中心改成「涼適避難所」，冷氣開一整天。很多獨居的長輩每天下午都來這裡下棋、看電視。"
      },
      {
        "id": "SW_neighbor_lonely_elder",
        "year_range": [
          1990,
          2120
        ],
        "age_range": [
          20,
          70
        ],
        "relation": "樓下的鄰居",
        "category": "relative",
        "text": "樓下獨居的阿伯過世好幾天才被發現。管理員說他的孩子都在國外，一年回來一次。那天晚上你打了一通很久沒打的電話給爸媽。",
        "memory": "neighbor_died_alone",
        "memory_echo": "樓下獨居的阿伯過世好幾天才被發現"
      },
      {
        "id": "SW_colleague_layoff",
        "year_range": [
          1998,
          2100
        ],
        "age_range": [
          25,
          60
        ],
        "relation": "隔壁座位的同事",
        "category": "friend",
        "text": "隔壁座位的同事今天早上被叫進會議室，出來的時候手上拿著一個紙箱。他做了十五年，最後一封信只有三行。",
        "memory": "colleague_laid_off",
        "memory_echo": "做了十五年的同事一夕之間被裁員"
      },
      {
        "id": "SW_teacher_encouragement",
        "year_range": [
          1955,
          2100
        ],
        "age_range": [
          10,
          17
        ],
        "relation": "班導師",
        "category": "friend",
        "text": "班導師在你的作文簿上寫了一行紅字：「你很有想法，不要放棄。」你把那一頁偷偷撕下來，夾在抽屜裡很多年。"
      },
      {
        "id": "SW_first_love_marries",
        "year_range": [
          1960,
          2100
        ],
        "age_range": [
          24,
          38
        ],
        "relation": "初戀",
        "category": "friend",
        "text": "從朋友那裡聽說初戀結婚了，對象是你不認識的人。你以為自己早就忘了，結果那天晚上還是翻出了以前的照片。"
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
        },
        "world_bias": {
          "ai": {
            "fast": 1.6,
            "slow": 0.4
          }
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
        },
        "world_bias": {
          "climate": {
            "harsh": 1.6,
            "mild": 0.5
          }
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
        },
        "world_bias": {
          "ai": {
            "fast": 1.4,
            "slow": 0.7
          }
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
        },
        "world_bias": {
          "economy": {
            "boom": 1.2,
            "crisis": 0.8
          }
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
        },
        "world_bias": {
          "economy": {
            "boom": 1.3,
            "crisis": 0.6
          }
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
        },
        "world_bias": {
          "demo": {
            "decline": 1.3,
            "rebound": 0.5
          }
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
        },
        "world_bias": {
          "geo": {
            "calm": 1.3,
            "tense": 0.8
          },
          "economy": {
            "boom": 1.4,
            "crisis": 0.6
          }
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
        },
        "world_bias": {
          "geo": {
            "tense": 1.5,
            "calm": 0.7
          }
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
        },
        "world_bias": {
          "ai": {
            "fast": 1.2,
            "slow": 0.9
          }
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
        },
        "world_bias": {
          "climate": {
            "mild": 1.3,
            "harsh": 0.8
          },
          "economy": {
            "boom": 1.2
          }
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
        },
        "world_bias": {
          "climate": {
            "harsh": 1.4,
            "mild": 0.7
          },
          "ai": {
            "fast": 1.2
          }
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
        },
        "world_bias": {
          "demo": {
            "decline": 1.4,
            "rebound": 0.5
          }
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
        },
        "world_bias": {
          "demo": {
            "decline": 1.3,
            "rebound": 0.7
          }
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
        },
        "world_bias": {
          "economy": {
            "stagnant": 1.3,
            "boom": 0.8
          },
          "demo": {
            "decline": 1.2
          }
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
        },
        "world_bias": {
          "geo": {
            "tense": 1.4,
            "calm": 0.8
          }
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
        },
        "world_bias": {
          "climate": {
            "harsh": 1.6,
            "mild": 0.4
          }
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
        },
        "world_bias": {
          "ai": {
            "fast": 1.2,
            "slow": 0.8
          }
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
        },
        "world_bias": {
          "ai": {
            "fast": 1.5,
            "slow": 0.3
          },
          "economy": {
            "crisis": 1.2
          }
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
        },
        "world_bias": {
          "economy": {
            "boom": 1.3,
            "crisis": 0.7
          }
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
        },
        "world_bias": {
          "ai": {
            "fast": 1.2,
            "slow": 0.8
          }
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
        },
        "world_bias": {
          "demo": {
            "decline": 1.5,
            "rebound": 0.2
          }
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
        },
        "world_bias": {
          "ai": {
            "fast": 1.5,
            "slow": 0.3
          }
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
        },
        "world_bias": {
          "demo": {
            "decline": 1.4,
            "rebound": 0.5
          }
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
        },
        "world_bias": {
          "ai": {
            "fast": 1.3,
            "slow": 0.7
          }
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
        },
        "world_bias": {
          "demo": {
            "decline": 1.5,
            "rebound": 0.1
          }
        }
      },
      {
        "id": "FF_2078_netzero_green_island",
        "year_range": [
          2072,
          2115
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
        },
        "world_bias": {
          "climate": {
            "mild": 1.4,
            "harsh": 0.6
          }
        }
      },
      {
        "id": "FF_2034_geopolitical_supply_shock",
        "year_range": [
          2032,
          2042
        ],
        "probability": 0.32,
        "category": "geopolitics_economy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "geopolitical_stress_tested"
        ],
        "title": "印太航運保費飆升與區域供應鏈地緣震盪",
        "summary": "區域安全情勢升溫帶動台灣周邊海空運兵險與能源進口成本跳漲，部分外資避險部位短線撤出，民間物價與製造業急單／斷鏈波動劇烈，後備民防演習亦趨於常態化。",
        "institutional_aftermath": "企業全面建立雙供應鏈與能源儲備安全存量，社會對戰備韌性與緊急物資配送的重視大幅提升。",
        "trend_basis": "虛構推演 · 反映地緣政治對台灣海島能源、外資流向與物價通膨的結構性外部衝擊。",
        "cultural_footnote_en": "Fictional forecast: Regional security tensions spike maritime insurance and LNG import costs, triggering capital volatility and normalizing civil-defense preparedness.",
        "gameplay_impact": {
          "stock_shock_pct": -0.14,
          "living_cost_mult": 1.08,
          "happiness_delta": -5,
          "knowledge_delta": 1
        },
        "world_bias": {
          "geo": {
            "tense": 2.0,
            "calm": 0.3
          }
        }
      },
      {
        "id": "FF_2042_nhi_fiscal_squeeze",
        "year_range": [
          2040,
          2052
        ],
        "probability": 0.36,
        "category": "demographics_care",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "nhi_fiscal_tightened"
        ],
        "title": "超高齡醫藥支出爆量：健保費率大調漲與自費差額擴大",
        "summary": "隨著 65 歲以上人口與新式昂貴療法持續增加，健保安全準備金再度見底。政府宣布大幅調升健保與補充保費費率並擴大門診部分負擔與藥品自費差額，醫護人力荒亦迫使部分地區門診減診。",
        "institutional_aftermath": "醫療資源朝分級轉診與高齡自付上限改革調整，商業實支實付與長照保單成為中產家庭標配。",
        "trend_basis": "虛構推演 · 平衡少子高齡化與高價先進醫療並存下的財政代價。",
        "cultural_footnote_en": "Fictional forecast: Surge in elderly healthcare spending forces steep NHI premium hikes and higher out-of-pocket co-pays amid nursing shortages.",
        "gameplay_impact": {
          "living_cost_mult": 1.06,
          "care_cost_mult": 1.15,
          "health_delta_elder": -2,
          "happiness_delta": -4
        },
        "world_bias": {
          "economy": {
            "stagnant": 1.3,
            "crisis": 1.3,
            "boom": 0.6
          }
        }
      },
      {
        "id": "FF_2048_century_drought_fab_water",
        "year_range": [
          2045,
          2058
        ],
        "probability": 0.32,
        "category": "climate_energy",
        "regions": [
          "north_hsinchu",
          "central",
          "south_tainan",
          "ALL"
        ],
        "sets_world_flags": [
          "century_drought_adapted"
        ],
        "title": "極端氣候百年大旱：水庫見底與工業供水「供五停二」衝擊",
        "summary": "連續兩年聖嬰與極端氣候導致中南部與竹苗主要水庫蓄水跌破一成，全台啟動高壓工業節水與民生分區限水。科學園區緊急出動水車載水維持晶圓廠運轉，農田全面休耕引發菜價飆漲。",
        "institutional_aftermath": "加速全台海淡水廠、再生水廠與跨區調度聯通管完工，高耗水製程水價級距大幅上修。",
        "trend_basis": "虛構推演 · 延伸自台灣 2021 年百年大旱經驗與未來氣候變遷極端枯水期風險。",
        "cultural_footnote_en": "Fictional forecast: A multi-year mega-drought forces water rationing across central and northern Taiwan, forcing chip fabs onto water trucks and spiking food inflation.",
        "gameplay_impact": {
          "living_cost_mult": 1.07,
          "non_tech_wage_mult": 0.96,
          "happiness_delta": -5
        },
        "world_bias": {
          "climate": {
            "harsh": 1.8,
            "mild": 0.3
          }
        }
      },
      {
        "id": "FF_2058_major_fault_earthquake",
        "year_range": [
          2050,
          2075
        ],
        "probability": 0.2,
        "category": "climate_energy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "post_quake_retrofit_era"
        ],
        "title": "西南部盲斷層規模 7.0 強震：老屋危機與老舊電網重創",
        "summary": "台灣遭遇半世紀以來首見的淺層規模 7.0 都會區周邊強震，老舊無電梯公寓與部分未都更老街區傳出倒塌與供電輸配受損，引發全台加速強制老屋耐震快篩與公共設施補強。",
        "institutional_aftermath": "全面推動防災型公辦都更與關鍵電網地下化，防災保險成為購屋貸款必要條件。",
        "trend_basis": "虛構推演 · 依據台灣歷史強震 60–100 年重現期統計納入中長期天災壓力測試。",
        "cultural_footnote_en": "Fictional forecast: A shallow M7.0 fault earthquake exposes aging apartment stock and grid vulnerabilities, catalyzing mandatory seismic retrofits nationwide.",
        "gameplay_impact": {
          "stock_shock_pct": -0.1,
          "housing_cost_mult": 1.06,
          "health_delta": -3,
          "happiness_delta": -6,
          "mortality_mult": 1.05
        }
      },
      {
        "id": "FF_2032_ai_bubble_burst",
        "year_range": [
          2030,
          2036
        ],
        "probability": 0.4,
        "category": "ai_economy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "ai_bubble_burst"
        ],
        "title": "AI 概念股泡沫破裂：科技股兩年腰斬",
        "summary": "全球資金過度湧入 AI 算力與模型公司，獲利追不上估值。龍頭企業財報失色引爆連鎖拋售，台股電子權值股兩年內跌掉近半，竹科與內湖掀起一波凍結招募。",
        "institutional_aftermath": "金管會強化 AI 概念股資訊揭露，勞動部啟動科技業大量解僱通報與轉職補助。",
        "trend_basis": "虛構推演 · 參照 2000 年網路泡沫與歷次科技股修正週期推演。",
        "cultural_footnote_en": "Fictional forecast: An AI equity bubble bursts, halving tech stocks and freezing hiring across Taiwan's tech parks.",
        "gameplay_impact": {
          "stock_shock_pct": -0.3,
          "tech_wage_mult": 0.94,
          "happiness_delta": -4
        },
        "world_bias": {
          "economy": {
            "crisis": 2.0,
            "stagnant": 1.0,
            "boom": 0.3
          },
          "ai": {
            "fast": 1.3
          }
        },
        "mutually_exclusive_group": "ai_market_2030s"
      },
      {
        "id": "FF_2032_ai_productivity_boom",
        "year_range": [
          2030,
          2036
        ],
        "probability": 0.4,
        "category": "ai_economy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "ai_dividend"
        ],
        "title": "AI 生產力紅利兌現：台灣出口與薪資雙雙創高",
        "summary": "AI 從試辦走進工廠、醫院與中小企業，生產力明顯提升。台灣伺服器與晶片出口連年創高，企業開始把獲利分給員工，十多年來第一次出現普遍加薪。",
        "institutional_aftermath": "政府推出中小企業 AI 導入補助，基本工資審議納入生產力指標。",
        "trend_basis": "虛構推演 · 延伸自 2025 年後 AI 伺服器出口與產業導入趨勢。",
        "cultural_footnote_en": "Fictional forecast: AI productivity gains finally lift exports and broad-based wages in Taiwan.",
        "gameplay_impact": {
          "stock_shock_pct": 0.15,
          "wage_mult": 1.04,
          "happiness_delta": 3
        },
        "world_bias": {
          "economy": {
            "boom": 2.0,
            "stagnant": 0.8,
            "crisis": 0.2
          },
          "ai": {
            "fast": 1.4,
            "slow": 0.6
          }
        },
        "mutually_exclusive_group": "ai_market_2030s"
      },
      {
        "id": "FF_2034_strait_blockade_drill",
        "year_range": [
          2031,
          2040
        ],
        "probability": 0.42,
        "category": "geopolitics",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "blockade_stress"
        ],
        "title": "長期海空演習與航運中斷：台灣經歷 30 天的「準封鎖」",
        "summary": "區域局勢升溫，周邊海空演習一度持續一個月，貨輪改道、保險費暴漲，部分進口物資與能源吃緊。超市一度出現搶購潮，企業緊急啟動備援供應鏈。",
        "institutional_aftermath": "國家安全韌性委員會常態化，全民防衛動員與能源儲備天數大幅提高。",
        "trend_basis": "虛構推演 · 依區域地緣風險情境推演，不代表任何預測立場。",
        "cultural_footnote_en": "Fictional forecast: A month-long blockade-like drill disrupts shipping and tests Taiwan's resilience.",
        "gameplay_impact": {
          "stock_shock_pct": -0.15,
          "living_cost_mult": 1.04,
          "happiness_delta": -5
        },
        "requires_world_line": {
          "geo": [
            "tense"
          ]
        },
        "mutually_exclusive_group": "strait_2030s"
      },
      {
        "id": "FF_2034_cross_strait_thaw",
        "year_range": [
          2031,
          2040
        ],
        "probability": 0.35,
        "category": "geopolitics",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "regional_calm"
        ],
        "title": "區域局勢和緩：航運保費回落、觀光與投資回溫",
        "summary": "國際情勢轉趨穩定，區域航運保費回落，國際觀光客與外資重新回流台灣，股市與觀光業迎來一段溫和的好日子。",
        "institutional_aftermath": "政府擴大國際觀光推廣，外資投資審議流程簡化。",
        "trend_basis": "虛構推演 · 依區域地緣風險情境推演，不代表任何預測立場。",
        "cultural_footnote_en": "Fictional forecast: Regional tensions ease, bringing back tourism and foreign investment.",
        "gameplay_impact": {
          "stock_shock_pct": 0.08,
          "happiness_delta": 3
        },
        "requires_world_line": {
          "geo": [
            "calm"
          ]
        },
        "mutually_exclusive_group": "strait_2030s"
      },
      {
        "id": "FF_2036_super_typhoon",
        "year_range": [
          2033,
          2050
        ],
        "probability": 0.4,
        "category": "climate_energy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "super_typhoon_hit"
        ],
        "title": "超級颱風直撲中南部：一夜雨量破歷史紀錄",
        "summary": "暖化後的海溫讓颱風強度更強、移動更慢。一個超級颱風在中南部滯留兩天，多處淹水、土石流，部分地區停電一週。",
        "institutional_aftermath": "氣象署建立極端颱風分級，地方政府全面檢討滯洪池與高風險社區遷村。",
        "trend_basis": "虛構推演 · 延伸自西北太平洋強颱比例上升的氣候研究。",
        "cultural_footnote_en": "Fictional forecast: A slow-moving super typhoon smashes rainfall records across central and southern Taiwan.",
        "gameplay_impact": {
          "health_delta": -2,
          "happiness_delta": -4,
          "region_housing_shock_ids": [
            "south_tainan",
            "south_kaohsiung",
            "central"
          ],
          "region_housing_shock_pct": -0.05
        },
        "requires_world_line": {
          "climate": [
            "harsh"
          ]
        }
      },
      {
        "id": "FF_2037_birth_rebound",
        "year_range": [
          2034,
          2046
        ],
        "probability": 0.45,
        "category": "demography",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "birth_rebound"
        ],
        "title": "生育率谷底反彈：托育全面公共化後，出生數連三年回升",
        "summary": "0 到 6 歲托育全面公共化、育嬰假延長到一年並由國家支薪，加上住宅政策奏效，出生數意外連三年回升，產科與幼兒園重新開張。",
        "institutional_aftermath": "少子化對策從「發錢」轉為「時間與托育」，企業育兒友善認證成為求職指標。",
        "trend_basis": "虛構推演 · 參照北歐與部分東亞國家托育政策後的生育率變化推演。",
        "cultural_footnote_en": "Fictional forecast: Universal childcare helps Taiwan's birth rate rebound for three straight years.",
        "gameplay_impact": {
          "happiness_delta": 3,
          "living_cost_mult": 0.98
        },
        "requires_world_line": {
          "demo": [
            "rebound"
          ]
        }
      },
      {
        "id": "FF_2043_pension_cut",
        "year_range": [
          2040,
          2050
        ],
        "probability": 0.4,
        "category": "society",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "pension_cut"
        ],
        "title": "勞保年金改革：給付打折、提撥加碼",
        "summary": "勞保基金逼近破產線，立法院通過年金改革：退休給付打九折、在職者提撥率提高。年輕人與退休族各有不滿，街頭出現兩代對立的抗議。",
        "institutional_aftermath": "政府撥補基金並推動個人帳戶制雙軌化，鼓勵自主提撥。",
        "trend_basis": "虛構推演 · 延伸自勞保基金財務精算的長期趨勢。",
        "cultural_footnote_en": "Fictional forecast: Taiwan cuts labor-insurance pensions and raises contributions as the fund nears insolvency.",
        "gameplay_impact": {
          "living_cost_mult": 1.03,
          "happiness_delta": -4
        },
        "world_bias": {
          "economy": {
            "stagnant": 1.6,
            "crisis": 1.6,
            "boom": 0.3
          },
          "demo": {
            "decline": 1.3,
            "rebound": 0.6
          }
        }
      },
      {
        "id": "FF_2045_household_robots",
        "year_range": [
          2042,
          2058
        ],
        "probability": 0.42,
        "category": "ai_economy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "home_robots"
        ],
        "title": "家務與照護機器人進入一般家庭",
        "summary": "價格降到一台機車左右的家務機器人開始普及，能洗衣、打掃、陪長輩散步和提醒吃藥。外籍看護需求下降，長照家庭的負擔明顯減輕。",
        "institutional_aftermath": "衛福部將照護機器人納入長照輔具補助，並訂定隱私與安全規範。",
        "trend_basis": "虛構推演 · 延伸自服務型機器人成本下降與高齡照護需求。",
        "cultural_footnote_en": "Fictional forecast: Affordable household and care robots arrive in ordinary Taiwanese homes.",
        "gameplay_impact": {
          "care_cost_mult": 0.85,
          "health_delta_elder": 2,
          "happiness_delta": 2
        },
        "requires_world_line": {
          "ai": [
            "fast"
          ]
        }
      },
      {
        "id": "FF_2046_global_recession",
        "year_range": [
          2040,
          2060
        ],
        "probability": 0.4,
        "category": "economy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "great_recession_2040s"
        ],
        "title": "全球債務危機：二十年來最深的衰退",
        "summary": "主要經濟體的債務問題同時爆發，全球需求驟降。台灣出口連續六季衰退，無薪假與裁員潮重現，股市一年蒸發三成。",
        "institutional_aftermath": "政府推出擴大公共建設與失業保險延長給付，央行連續降息。",
        "trend_basis": "虛構推演 · 參照 2008 年金融海嘯與各國公共債務長期攀升的推演。",
        "cultural_footnote_en": "Fictional forecast: A global debt crisis triggers the deepest recession in two decades.",
        "gameplay_impact": {
          "stock_shock_pct": -0.3,
          "wage_mult": 0.95,
          "happiness_delta": -5
        },
        "world_bias": {
          "economy": {
            "crisis": 2.0,
            "stagnant": 0.6
          }
        },
        "requires_world_line": {
          "economy": [
            "crisis",
            "stagnant"
          ]
        },
        "mutually_exclusive_group": "macro_2040s"
      },
      {
        "id": "FF_2047_southbound_boom",
        "year_range": [
          2040,
          2060
        ],
        "probability": 0.4,
        "category": "economy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "southbound_boom"
        ],
        "title": "印太新興市場崛起：台灣中小企業搭上第二次外銷黃金期",
        "summary": "東南亞與印度的中產階級快速壯大，台灣的機械、醫材與食品品牌大舉進軍，中小企業像當年「一卡皮箱」一樣跑遍新興市場。",
        "institutional_aftermath": "經濟部推出新興市場拓銷基金，雙語與東南亞語人才成為熱門。",
        "trend_basis": "虛構推演 · 延伸自南亞與東南亞人口紅利與中產消費成長趨勢。",
        "cultural_footnote_en": "Fictional forecast: Rising Indo-Pacific markets bring Taiwanese SMEs a second export golden age.",
        "gameplay_impact": {
          "stock_shock_pct": 0.1,
          "wage_mult": 1.04,
          "happiness_delta": 3
        },
        "world_bias": {
          "economy": {
            "boom": 2.0,
            "stagnant": 0.6
          }
        },
        "requires_world_line": {
          "economy": [
            "boom",
            "stagnant"
          ]
        },
        "mutually_exclusive_group": "macro_2040s"
      },
      {
        "id": "FF_2045_pandemic_x",
        "year_range": [
          2038,
          2075
        ],
        "probability": 0.22,
        "category": "health",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "pandemic_x"
        ],
        "title": "新型呼吸道傳染病來襲：再一次的口罩與隔離",
        "summary": "一種新型病毒在國際間快速擴散，台灣再度啟動邊境管制與口罩實名制。這次有了 AI 疫調與快速疫苗平台，但高齡人口比例更高，長照機構成為防疫重點。",
        "institutional_aftermath": "中央流行疫情指揮中心常設化，國產疫苗快速量產平台啟用。",
        "trend_basis": "虛構推演 · 依全球大流行約數十年一遇的歷史頻率推演。",
        "cultural_footnote_en": "Fictional forecast: A novel respiratory pandemic returns Taiwan to masks, border controls and rapid vaccines.",
        "gameplay_impact": {
          "health_delta": -4,
          "happiness_delta": -4,
          "stock_shock_pct": -0.12,
          "health_delta_elder": -2
        }
      },
      {
        "id": "FF_2049_coastal_retreat",
        "year_range": [
          2045,
          2070
        ],
        "probability": 0.4,
        "category": "climate_energy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "coastal_retreat"
        ],
        "title": "海平面上升：西南沿海啟動有計畫的撤退遷村",
        "summary": "地層下陷加上海平面上升，雲嘉南與屏東沿海多個村落每逢大潮就淹水。政府首度推動「有計畫撤退」，補貼居民遷往內陸新市鎮。",
        "institutional_aftermath": "國土計畫劃設氣候高風險區，限制新建並推動遷村補償。",
        "trend_basis": "虛構推演 · 延伸自海平面上升與西南沿海地層下陷的長期監測。",
        "cultural_footnote_en": "Fictional forecast: Rising seas force planned retreat from Taiwan's southwestern coast.",
        "gameplay_impact": {
          "region_housing_shock_ids": [
            "south_tainan",
            "south_kaohsiung"
          ],
          "region_housing_shock_pct": -0.12,
          "happiness_delta": -3
        },
        "requires_world_line": {
          "climate": [
            "harsh"
          ]
        }
      },
      {
        "id": "FF_2052_brain_interface",
        "year_range": [
          2048,
          2065
        ],
        "probability": 0.35,
        "category": "ai_economy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "bci_era"
        ],
        "title": "非侵入式腦機介面上市：學習與工作方式再度改寫",
        "summary": "戴上輕量頭環就能用意念操作電腦、加速語言學習。年輕世代很快上手，中高齡上班族則擔心被淘汰，補習班紛紛改成「腦機訓練中心」。",
        "institutional_aftermath": "國家通訊傳播委員會訂定神經數據保護規範，禁止雇主強制使用。",
        "trend_basis": "虛構推演 · 延伸自腦機介面與穿戴式神經裝置的研發進展。",
        "cultural_footnote_en": "Fictional forecast: Non-invasive brain-computer interfaces reshape how Taiwan learns and works.",
        "gameplay_impact": {
          "knowledge_delta": 4,
          "tech_wage_mult": 1.05,
          "non_tech_wage_mult": 0.98
        },
        "requires_world_line": {
          "ai": [
            "fast"
          ]
        }
      },
      {
        "id": "FF_2056_cheap_energy",
        "year_range": [
          2050,
          2075
        ],
        "probability": 0.38,
        "category": "climate_energy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "cheap_energy"
        ],
        "title": "潔淨能源成本崩跌：電費十年來首次大降",
        "summary": "太陽能、儲能與新型核能成本持續下降，台灣電價十年來首次調降，冷氣不再是奢侈品，工廠與資料中心擴產加速。",
        "institutional_aftermath": "電業法修正開放社區售電，能源轉型從補貼走向市場化。",
        "trend_basis": "虛構推演 · 延伸自再生能源與儲能成本的長期學習曲線。",
        "cultural_footnote_en": "Fictional forecast: Clean-energy costs collapse and Taiwan's electricity prices fall for the first time in a decade.",
        "gameplay_impact": {
          "living_cost_mult": 0.96,
          "happiness_delta": 3
        },
        "world_bias": {
          "climate": {
            "mild": 1.6,
            "harsh": 0.6
          },
          "economy": {
            "boom": 1.4,
            "crisis": 0.6
          }
        }
      },
      {
        "id": "FF_2057_lost_decade",
        "year_range": [
          2050,
          2075
        ],
        "probability": 0.4,
        "category": "economy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "lost_decade"
        ],
        "title": "失落的十年：薪資停滯、物價溫和、年輕人「低慾望」",
        "summary": "產業轉型不順加上人口老化，台灣經濟陷入長期低成長。薪水十年沒怎麼動，年輕人不買房、不買車，「低慾望社會」成為流行語。",
        "institutional_aftermath": "政府推動移民開放與產業升級方案，成效仍待觀察。",
        "trend_basis": "虛構推演 · 參照日本失落年代的人口與經濟結構推演。",
        "cultural_footnote_en": "Fictional forecast: Taiwan slips into a lost decade of stagnant pay and a 'low-desire' youth culture.",
        "gameplay_impact": {
          "wage_mult": 0.96,
          "housing_cost_mult": 0.97,
          "happiness_delta": -2
        },
        "requires_world_line": {
          "economy": [
            "stagnant",
            "crisis"
          ]
        }
      },
      {
        "id": "FF_2062_heat_dome",
        "year_range": [
          2055,
          2085
        ],
        "probability": 0.4,
        "category": "climate_energy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "heat_dome"
        ],
        "title": "熱穹頂籠罩全台：連續兩週 42°C",
        "summary": "一場罕見的熱穹頂讓全台連續兩週高溫破 42°C，夜間也降不到 30°C。熱傷害送醫人數創新高，戶外工作全面停工，長輩成為最脆弱的一群。",
        "institutional_aftermath": "高溫假與戶外工作停工標準全面入法，各里設立「涼適避難所」。",
        "trend_basis": "虛構推演 · 延伸自極端高溫事件頻率上升的氣候推估。",
        "cultural_footnote_en": "Fictional forecast: A heat dome bakes Taiwan above 42°C for two weeks, straining health and power.",
        "gameplay_impact": {
          "health_delta": -3,
          "health_delta_elder": -3,
          "mortality_mult": 1.03,
          "happiness_delta": -3
        },
        "requires_world_line": {
          "climate": [
            "harsh"
          ]
        }
      },
      {
        "id": "FF_2063_space_industry",
        "year_range": [
          2055,
          2080
        ],
        "probability": 0.25,
        "category": "ai_economy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "space_industry"
        ],
        "title": "台灣衛星與太空產業成形：屏東發射場常態商轉",
        "summary": "低軌衛星製造與商業發射在屏東形成聚落，台灣成為亞洲小型衛星的主要供應國之一，太空工程師成為新的熱門職業。",
        "institutional_aftermath": "太空發展法修正，地方政府爭取太空產業園區。",
        "trend_basis": "虛構推演 · 延伸自台灣太空中心與低軌衛星供應鏈的發展。",
        "cultural_footnote_en": "Fictional forecast: A homegrown satellite and launch industry takes root in southern Taiwan.",
        "gameplay_impact": {
          "tech_wage_mult": 1.05,
          "region_bonus_ids": [
            "south_kaohsiung"
          ],
          "region_wage_mult": 1.04,
          "happiness_delta": 2
        },
        "world_bias": {
          "economy": {
            "boom": 1.6,
            "crisis": 0.5
          },
          "ai": {
            "fast": 1.3
          }
        }
      },
      {
        "id": "FF_2070_population_15m",
        "year_range": [
          2065,
          2110
        ],
        "probability": 0.4,
        "category": "demography",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "population_15m"
        ],
        "title": "人口跌破 1,500 萬：一半的鄉鎮被列為「消滅危機」",
        "summary": "人口持續萎縮，全台一半鄉鎮人口不到高峰時的一半。學校、診所與公車線一一收掉，留下來的居民必須搬到整併後的核心城鎮。",
        "institutional_aftermath": "國土重劃推動「核心城鎮＋無人機物流」模式，鄉鎮市公所合併。",
        "trend_basis": "虛構推演 · 依國發會人口推計低推估情境延伸。",
        "cultural_footnote_en": "Fictional forecast: Taiwan's population falls below 15 million, hollowing out half its townships.",
        "gameplay_impact": {
          "living_cost_mult": 1.03,
          "happiness_delta": -2,
          "region_housing_shock_ids": [
            "east_islands",
            "south_tainan"
          ],
          "region_housing_shock_pct": -0.15
        },
        "requires_world_line": {
          "demo": [
            "decline"
          ]
        }
      },
      {
        "id": "FF_2074_baby_boom_echo",
        "year_range": [
          2065,
          2110
        ],
        "probability": 0.4,
        "category": "demography",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "baby_boom_echo"
        ],
        "title": "回聲嬰兒潮：二十年前回升的那一代，開始生下一代",
        "summary": "2030–40 年代生育回升的那一代成年了，出生數再次溫和上升，社區又聽得到孩子的聲音，退場的學校重新開張。",
        "institutional_aftermath": "教育部重新規劃中小學設校，地方政府推動「回流成家」補助。",
        "trend_basis": "虛構推演 · 延伸自生育率回升情境的世代回聲推演。",
        "cultural_footnote_en": "Fictional forecast: The children of Taiwan's birth rebound start families, echoing a small baby boom.",
        "gameplay_impact": {
          "happiness_delta": 4,
          "social_delta": 2
        },
        "requires_world_line": {
          "demo": [
            "rebound"
          ]
        }
      },
      {
        "id": "FF_2076_aging_pill",
        "year_range": [
          2068,
          2100
        ],
        "probability": 0.14,
        "category": "health",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "aging_pill"
        ],
        "title": "延緩老化藥物獲准上市：「健康餘命」再延長五年",
        "summary": "首款證實能延緩細胞老化的口服藥通過核准，價格不菲但逐步納入健保。七十歲的人看起來像五十歲，退休與家庭結構再度改寫。",
        "institutional_aftermath": "健保署分階段給付，勞動部研議再延後退休年齡。",
        "trend_basis": "虛構推演 · 延伸自老化生物學與長壽醫學的研發趨勢。",
        "cultural_footnote_en": "Fictional forecast: The first approved anti-aging drug extends healthy lifespan by about five years.",
        "gameplay_impact": {
          "mortality_mult": 0.92,
          "health_delta_elder": 3,
          "happiness_delta": 3
        },
        "world_bias": {
          "ai": {
            "fast": 1.4,
            "slow": 0.7
          }
        }
      },
      {
        "id": "FF_2081_ai_governance_crisis",
        "year_range": [
          2072,
          2115
        ],
        "probability": 0.35,
        "category": "ai_economy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "ai_governance_crisis"
        ],
        "title": "AI 治理危機：一場系統失控讓金融與交通停擺三天",
        "summary": "高度自動化的金融與交通系統出現連鎖錯誤，全台金流、捷運與物流停擺三天。社會開始反思把太多決定交給 AI，「人類在迴路中」成為新的法規原則。",
        "institutional_aftermath": "立法院通過 AI 關鍵基礎設施法，要求人類最終決策權與離線備援。",
        "trend_basis": "虛構推演 · 延伸自關鍵基礎設施自動化風險的推演。",
        "cultural_footnote_en": "Fictional forecast: A cascading AI failure halts Taiwan's finance and transport for three days.",
        "gameplay_impact": {
          "stock_shock_pct": -0.15,
          "happiness_delta": -4
        },
        "requires_world_line": {
          "ai": [
            "fast"
          ]
        }
      },
      {
        "id": "FF_2086_climate_recovery",
        "year_range": [
          2078,
          2120
        ],
        "probability": 0.4,
        "category": "climate_energy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "climate_recovery"
        ],
        "title": "全球排放達峰後回落：夏天第一次沒有變得更熱",
        "summary": "全球排放在 2060 年代達峰後持續下降，氣溫上升趨緩。台灣的夏天第一次連續幾年沒有創新高，海岸線的變化也慢了下來。",
        "institutional_aftermath": "國家氣候調適計畫從「防災」轉向「復育」，重建濕地與海岸林。",
        "trend_basis": "虛構推演 · 依全球淨零路徑順利實現的情境推演。",
        "cultural_footnote_en": "Fictional forecast: Global emissions fall and, for the first time in decades, Taiwan's summers stop getting hotter.",
        "gameplay_impact": {
          "health_delta": 2,
          "happiness_delta": 3
        },
        "requires_world_line": {
          "climate": [
            "mild"
          ]
        }
      },
      {
        "id": "FF_2090_great_flood",
        "year_range": [
          2080,
          2120
        ],
        "probability": 0.35,
        "category": "climate_energy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "great_flood"
        ],
        "title": "百年洪水：西部平原大範圍淹水",
        "summary": "一場前所未見的豪雨伴隨暴潮，西部平原大範圍淹水，多座城市地下室與捷運站進水，數十萬人暫時撤離。",
        "institutional_aftermath": "全國啟動「與水共生」城市改造，地下空間全面加裝防洪閘門。",
        "trend_basis": "虛構推演 · 依極端降雨與海平面上升的長期情境推演。",
        "cultural_footnote_en": "Fictional forecast: An unprecedented flood swamps Taiwan's western plains and city subways.",
        "gameplay_impact": {
          "health_delta": -2,
          "happiness_delta": -4,
          "region_housing_shock_ids": [
            "south_tainan",
            "central",
            "north_taipei"
          ],
          "region_housing_shock_pct": -0.06
        },
        "requires_world_line": {
          "climate": [
            "harsh"
          ]
        }
      },
      {
        "id": "FF_2095_centenarian_society",
        "year_range": [
          2088,
          2125
        ],
        "probability": 0.4,
        "category": "society",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "centenarian_society"
        ],
        "title": "百歲人瑞突破十萬人：「一百歲」成為人生的新常態",
        "summary": "全台百歲人瑞突破十萬人，社區裡的百歲生日派對不再稀奇。人們開始規劃「第三段人生」，七十歲重新上大學的人越來越多。",
        "institutional_aftermath": "教育部推動終身學習學分銀行，百歲人瑞健康照護納入社區醫療常規。",
        "trend_basis": "虛構推演 · 依平均壽命延長與高齡人口推估延伸。",
        "cultural_footnote_en": "Fictional forecast: Taiwan passes 100,000 centenarians as living to 100 becomes ordinary.",
        "gameplay_impact": {
          "social_delta": 2,
          "happiness_delta": 2
        }
      },
      {
        "id": "FF_2100_new_century",
        "year_range": [
          2098,
          2110
        ],
        "probability": 0.5,
        "category": "society",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "new_century"
        ],
        "title": "迎接 22 世紀：台灣在跨世紀夜晚回顧百年",
        "summary": "2100 年的最後一天，全台各地舉辦跨世紀晚會，電視台播放百年台灣影像回顧，從戒嚴、解嚴、民主化到 AI 時代。許多長輩說，這一百年變得比他們想像的還多。",
        "institutional_aftermath": "國家檔案館開放「百年台灣家族記憶」數位典藏。",
        "trend_basis": "虛構推演 · 依時間推演的象徵性年度事件。",
        "cultural_footnote_en": "Fictional forecast: Taiwan welcomes the 22nd century with a nationwide look back at a hundred years.",
        "gameplay_impact": {
          "happiness_delta": 3,
          "social_delta": 2
        }
      },
      {
        "id": "FF_2104_lifelong_learning_retirement",
        "year_range": [
          2098,
          2125
        ],
        "probability": 0.4,
        "category": "society",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "no_retirement_age"
        ],
        "title": "退休制度大翻修：「退休年齡」從法律中消失",
        "summary": "健康餘命延長到九十歲以上，政府廢除強制退休年齡，改為「彈性工作＋終身學習帳戶」。八十歲的人重回大學、半工半讀成為常態。",
        "institutional_aftermath": "勞動法全面改寫，年金改為依工作年數與健康狀況彈性給付。",
        "trend_basis": "虛構推演 · 依健康餘命延長的長期情境推演。",
        "cultural_footnote_en": "Fictional forecast: Taiwan abolishes the retirement age in favor of flexible work and lifelong learning accounts.",
        "gameplay_impact": {
          "knowledge_delta": 3,
          "happiness_delta": 2
        }
      },
      {
        "id": "FF_2108_ai_personhood_debate",
        "year_range": [
          2098,
          2125
        ],
        "probability": 0.35,
        "category": "ai_economy",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "ai_personhood_debate"
        ],
        "title": "AI 能不能有「人格」？憲法法庭受理第一件 AI 權利案",
        "summary": "一個陪伴長者二十多年的 AI 助理，在主人過世後被家屬要求刪除，引發社會激辯：AI 是財產，還是某種家人？全台家庭飯桌上都在吵這件事。",
        "institutional_aftermath": "憲法法庭作成指標性判決，數位陪伴者的資料保存與刪除權交由使用者生前指定。",
        "trend_basis": "虛構推演 · 依 AI 陪伴與數位人格的倫理討論推演。",
        "cultural_footnote_en": "Fictional forecast: Taiwan's Constitutional Court hears its first case on whether an AI companion has rights.",
        "gameplay_impact": {
          "social_delta": 1,
          "happiness_delta": -1
        },
        "requires_world_line": {
          "ai": [
            "fast"
          ]
        }
      },
      {
        "id": "FF_2112_digital_heritage_island",
        "year_range": [
          2100,
          2125
        ],
        "probability": 0.4,
        "category": "society",
        "regions": [
          "ALL"
        ],
        "sets_world_flags": [
          "digital_heritage"
        ],
        "title": "「台灣百年記憶」全民數位典藏完成",
        "summary": "歷時三十年的全民數位典藏計畫完成，每個家庭都能把老照片、錄音與家族故事存進國家記憶庫。許多人第一次聽到曾祖父母的聲音。",
        "institutional_aftermath": "國家檔案館開放家族記憶查詢，學校把家族史納入課程。",
        "trend_basis": "虛構推演 · 依數位典藏與家族記憶保存的長期趨勢推演。",
        "cultural_footnote_en": "Fictional forecast: Taiwan completes a nationwide digital archive of family memories spanning a century.",
        "gameplay_impact": {
          "happiness_delta": 3,
          "social_delta": 2
        }
      }
    ]
  }
};
