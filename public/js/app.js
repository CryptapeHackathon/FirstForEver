(function(config){
  App = {};

  // set config
  App.config = config;

  // local storage
  App.store = {
    get: function (key) {
      const value = window.localStorage.getItem(key);
      return JSON.parse(value);
    },

    set: function (key, value) {
      value = JSON.stringify(value);
      window.localStorage.setItem(key, value);
    }
  };


  App.init = function () {

    $("#submitBtn").click(App.submitContent);

    $("#showPage").each(App.showPage);


    $("#listPage").each(App.listPage);

  };

  App.submitContent = function (event) {
    event.preventDefault();

    const contentBody = $("#contentBody").val();

    console.info(['send', contentBody]);

    const chain = App.config.chainUrl;
    const web3 = window.NervosWeb3(chain);


    var content_type = "text";
    var content_body = contentBody;
    console.info(['content_body plan:', content_body]);

    var content_body = baseb64Encode(content_body);
    console.info(['content_body baseb64_encode:', content_body]);
    var content_body_de = baseb64Decode(content_body);
    console.info(['content_body baseb64_decode:', content_body_de]);

    const content_json = {
      content_type: content_type,
      content_body: content_body,
    };

    var tx_data = jsonToHex(content_json);
    var tx_data_de = hexToJson(tx_data);

    console.info(['tx_data=', content_json, tx_data]);
    console.info(['tx_data hexToJson:', tx_data_de]);
    console.info("encode/decode end");

    const hexData = "0x"+tx_data;
    console.info(['hexData:', hexData]);

    const privkey = App.config.privkey;
    var nonce = Math.random().toString().slice(2);

    console.info(["nonce", nonce]);

    const tx = {
      to: App.config.sendTo,
      from: App.config.sendFrom,
      privkey: privkey,
      nonce: nonce,
      quota: App.config.sendQuota,
      data: hexData,
      value: App.config.sendValue,
      chainId: App.config.chainId,
      version: 0,
    };

    // sendTransaction
    web3.eth.sendTransaction(tx).then(res => {
     console.log(['sendTransaction', tx, res]);

     setTimeout(function(){
       sendTransactionDone(tx, res);
     }, 6000); // TODO: make it quick

    });

    function sendTransactionDone(tx, res) {
      const txid = res["result"]["hash"];
      console.log(["sendTransactionDone", "txid:", txid]);

      var memories = App.store.get("memories");
      if(!memories) memories = [];
      memories.push(txid);
      App.store.set("memories", memories);

      memories = App.store.get("memories");
      console.info(['memories', memories]);

      var url = "$chainBrowserUrl/#/transaction/$txid";
      url = url.replace("$chainBrowserUrl", App.config.chainBrowserUrl);
      url = url.replace("$txid", txid);
      console.info(["url:", url]);

      App.redirectTo("show.html", {txid: txid});
    }

  };

  // redirect to a page with hash params
  // e.g.: App.redirectTo("show.html", {txid: txid});
  App.redirectTo = function (page, params) {
    var path = [page, $.param(params)].join("?");
    window.location.href = path;
  };

  App.showPage = function () {
    var queryParams = $.getQueryParameters();
    console.info(queryParams);

    if(queryParams["txid"]){
      var txid = queryParams["txid"];

      const chain = App.config.chainUrl;
      const web3 = window.NervosWeb3(chain);

      var url = "$chainBrowserUrl/#/transaction/$txid";
      url = url.replace("$chainBrowserUrl", App.config.chainBrowserUrl);
      url = url.replace("$txid", txid);
      console.info(["url:", url]);

      web3.eth.getTransaction(txid).then(res => {
        console.log(['getTransaction', txid, res])

        // res should be sth like:
        // var res = {
        //   "jsonrpc": "2.0",
        //   "id": 361,
        //   "result": {
        //     "hash": "0x4cb88dfd345c14bd19fee51b49bd8cb...",
        //     "content": "0x0a301864209c0e2a058989898989...",
        //     "blockNumber": "0x6c6",
        //     "blockHash": "0xe9668c05536e746260d6844b57...",
        //     "index": "0x0"
        //   }
        // }

        var content = res["result"]["content"];
        console.info(['content', content]);

        var res = web3.cita.parsers.transactionContentParser(content);
        console.info(['res', res]);
        const uint8 = res["data"]; // Uint8Array(53)

        const hex = bytesToHex(uint8).slice(2);
        console.info(["hex:", hex]);
        const tx_data_de = hexToJson(hex);
        console.info(["tx_data_de:", tx_data_de]);

        const content_body = tx_data_de["content_body"];

        const content_body_de = baseb64Decode(content_body);
        console.info(['content_body baseb64_decode:', content_body_de]);

        // render result
        $("#txid").text(txid);
        $("#contentBody").text(content_body_de);

      })
    }
  };

  App.listPage = function () {
    var tmpl = $.templates("#listItemTpl");
    var list = $("#messageList");

    var memories = App.store.get("memories");
    if(memories){
      for (var i = 0; i < memories.length; i++) {
        var txid = memories[i];
        var newItem = tmpl.render({ txid : txid });
        list.append(newItem);
      }
    }
  };

  $(App.init);

})(AppConfig);