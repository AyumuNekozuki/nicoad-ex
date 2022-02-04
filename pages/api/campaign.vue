<template>
  <div id="campaign">
    <h2>ニコニ広告ex. キャンペーン一覧</h2>
    <div class="campaign_data">
      <div class="item_wrap" v-if="campaign_data && campaign_data.meta.status == 200">
        <div class="item" v-for="item in campaign_data.data.conductors" :key="item">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <img :src="item.bannerImageUrl" alt="" srcset="" crossorigin>
          </a>
        </div>
      </div>
      <div class="error item" v-if="!campaign_data || campaign_data.meta.status !== 200">
        <p>データの取得に失敗しました</p>
      </div>
    </div>
    <hr>
    <small><a href="https://nicoad.nicovideo.jp/campaign" target="_blank" rel="noopener noreferrer">公式のキャンペーン一覧ページで見る</a></small>
    <small>ニコニ広告ex. CanpaignWebClient 20220204</small>
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
      transition: all .1s;
      display: flex;
      align-items: center;

      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: none;
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

  small{
    display: block;
    margin: .5rem 1rem;

    a{
      color: #0080ff;
      &:hover{
        text-decoration: none;
      }
    }
  }
}
</style>