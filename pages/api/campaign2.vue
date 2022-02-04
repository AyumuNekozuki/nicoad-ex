<template>
  <div id="campaign">
    <h2>ニコニ広告ex. キャンペーン一覧</h2>
    <div class="campaign_data">
      <div class="item_wrap" v-if="campaign_data && campaign_data.meta.status == 200">
        <div class="item" v-for="item in campaign_data.data.conductors" :key="item">
          <!-- <a :href="item.url">
            <img :src="item.bannerImageUrl" :alt="item.text" srcset="">
          </a> -->
          <a :href="item.bannerImageUrl" target="_blank" rel="noopener noreferrer">
            <div class="thumbarea">
              <img :src="item.url" alt="" srcset="" crossorigin>
            </div>
            <div class="thumbarea">
              <img :src="'https://api.nekozuki.me/api/ogpimg?url='+item.url" alt="" srcset="" crossorigin>
            </div>
            <span v-if="item.url !== 'https://blog.nicovideo.jp/niconews/124652.html?ref=202008nicoad&conductorId=3405&frameMasterId=7'">{{ item.text }}</span>
            <span v-if="item.url == 'https://blog.nicovideo.jp/niconews/124652.html?ref=202008nicoad&conductorId=3405&frameMasterId=7'">ﾆｺﾆｺﾌﾟﾚﾐｱﾑ 年額払いで入会すると1200pt広告チケット！</span>
          </a>
        </div>
      </div>
      <div class="error item" v-if="!campaign_data || campaign_data.meta.status !== 200">
        <p>データの取得に失敗しました</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }){
    let [campaign_data] = await Promise.all([
      $axios.$get("/api_nicoad_campaign/conductors?conductorFrameId=7&limit=30"),
    ]);

    return {
      campaign_data
    }
  }
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
body{
  margin: 0 !important;
  padding: 0 !important;
}

#campaign{
  background: #fafafa;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px 0;

  h1{
    margin: 0 auto;
    padding: 10px 0 0;
    width: 100%;
    max-width: 200px;
    
    img{
      width: 100%;
      object-fit: contain;
    }
  }
  h2{
    margin: 0;
    text-align: center;
    font-size: 18px;
    font-family: "M PLUS Rounded 1c", sans-serif;
    font-weight: 700;
    transform:rotateZ(0.03deg);
    color: #252525;
  }

  .item{
    margin: 15px;
    a{
      font-family: "M PLUS Rounded 1c", sans-serif;
      transform:rotateZ(0.03deg);
      display: block;
      text-decoration: none;
      color: #252525;
      background-color: white;
      padding: 5px 10px;
      border-radius: 5px;
      box-shadow: 0 0 3px #F97F2850;
      transition: all .1s;
      display: flex;
      align-items: center;

      .thumbarea{
        width: 100px !important;
        margin-right: 10px;
        border: 1px solid #ccc;
        aspect-ratio: 16 / 9;

        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: none;
        }
      }
      span{
        flex: 1;
      }

      &:hover{
        transform: translateY(-2px);
      }
    }

    &.error{
      font-family: "M PLUS Rounded 1c", sans-serif;
      transform:rotateZ(0.03deg);
      display: block;
      text-decoration: none;
      color: #252525;
      background-color: white;
      padding: 5px 10px;
      border-radius: 5px;
      box-shadow: 0 0 3px #f0000050;
      text-align: center;
    }
  }
}
</style>